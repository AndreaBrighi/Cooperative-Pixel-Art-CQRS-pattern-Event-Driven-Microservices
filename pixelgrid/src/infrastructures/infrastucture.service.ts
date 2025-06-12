import { Inject, Injectable, Logger } from '@nestjs/common';
import { PixelGridRepository } from '../core/pixel-grids-repository';
import { ColorPixelEvent } from '../core/ColorPixelEvent';
import { ClientKafka } from '@nestjs/microservices';
import { eventDTO } from '../controllers/dto/EventDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snapshot } from 'src/db/schemas/snapshot.schema';
import { Event as EventDB } from 'src/db/schemas/event.schema';

@Injectable()
export class PixelGridsService implements PixelGridRepository {
  constructor(
    @Inject('GRID_SERVICE') private clientKafka: ClientKafka,
    @InjectModel(EventDB.name) private eventModel: Model<EventDB>,
    @InjectModel(Snapshot.name) private snapshotModel: Model<Snapshot>,
  ) {
    this.clientKafka.emit('grid_created', process.env.GRID);
  }

  colorGrid(grid: string, event: ColorPixelEvent) {
    this.clientKafka.emit<string, string>(
      'color_pixel',
      JSON.stringify(new eventDTO(grid, event.color, event.pixel)),
    );
    const eventTime = new Date();
    const newEvent = new this.eventModel({
      gridName: grid,
      color: event.color,
      point: { x: event.pixel.x, y: event.pixel.y },
      time: eventTime,
    });
    Logger.log(
      `Event saved: ${newEvent.color} at (${newEvent.point}) on grid ${newEvent.gridName} at ${newEvent.time}`,
    );
    newEvent.save().catch((err) => {
      Logger.error('Error saving event to database:', err);
    }).then(() => {
      const lastSnapshot = this.snapshotModel
        .findOne({ gridName: grid })
        .sort({ time: -1 })
        .exec();
      lastSnapshot.then((snapshot) => {
      Logger.log(`Last snapshot for grid ${grid}: ${snapshot ? snapshot.time : 'None'}`);
        if (snapshot) {
          const eventSinceLastSnapshot = this.eventModel.find({
            gridName: grid,
            time: { $gte: snapshot.time },
          }).sort({ time: 1 }).exec();
          eventSinceLastSnapshot.then((events) => {
            Logger.log(`Events since last snapshot for grid ${grid}: ${events.length}`);
            if (events.length >= 10) {
              const newSnapshot = new this.snapshotModel({
                gridName: grid,
                grid: snapshot.grid,
                time: new Date(),
              });
              for (const event of events) {
                const x = Number(Object.values(event.point)[0]);
                const y = Number(Object.values(event.point)[1]);
                newSnapshot.grid[y][x] = event.color;
              }
              Logger.log(
                `New snapshot created for grid ${grid} at ${newSnapshot.time}`,
              );
              newSnapshot.save().catch((err) => {
                Logger.error('Error saving snapshot to database:', err);
              });
            }
          });
        } else {
          const initialGrid = Array.from({ length: 10 }, () =>
            Array(10).fill('#FFFFFF'),
          ); // Example initial grid
          Logger.log(`No previous snapshot found for grid ${grid}. Creating initial snapshot.`);
          initialGrid[Number(event.pixel.y)][Number(event.pixel.x)] = event.color;
          const newSnapshot = new this.snapshotModel({
            gridName: grid,
            grid: initialGrid,
            time: new Date(),
          });
          newSnapshot.save().catch((err) => {
            Logger.error('Error saving initial snapshot to database:', err);
          });
        }
      });
    });
  }
}
