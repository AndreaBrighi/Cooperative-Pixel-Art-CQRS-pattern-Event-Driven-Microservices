import { Inject, Injectable } from '@nestjs/common';
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
    newEvent.save().catch((err) => {
      console.error('Error saving event to database:', err);
    });
    const lastSnapshot = this.snapshotModel
      .findOne({ gridName: grid })
      .sort({ time: -1 })
      .exec();
    lastSnapshot.then((snapshot) => {
      if (snapshot) {
        const eventSinceLastSnapshot = this.eventModel.find({
          gridName: grid,
          time: { $gte: snapshot.time },
        });
        eventSinceLastSnapshot.then((events) => {
          if (events.length > 10) {
            const updatedGrid = snapshot.grid.map((row) => [...row]);
            updatedGrid[event.pixel.y][event.pixel.x] = event.color;
            const newSnapshot = new this.snapshotModel({
              gridName: grid,
              grid: updatedGrid,
              time: eventTime,
            });
            newSnapshot.save().catch((err) => {
              console.error('Error saving snapshot to database:', err);
            });
          }
        });
      } else {
        const initialGrid = Array.from({ length: 10 }, () =>
          Array(10).fill('#FFFFFF'),
        ); // Example initial grid
        const newSnapshot = new this.snapshotModel({
          gridName: grid,
          grid: initialGrid,
          time: new Date(),
        });
        newSnapshot.save().catch((err) => {
          console.error('Error saving initial snapshot to database:', err);
        });
      }
    });
  }
}
