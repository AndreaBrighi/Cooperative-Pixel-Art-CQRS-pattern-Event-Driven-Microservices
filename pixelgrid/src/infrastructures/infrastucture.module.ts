import { Logger, Module } from '@nestjs/common';
import { PixelGridsService } from './infrastucture.service';
import { PixelGridRepository } from '../core/pixel-grids-repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/db/schemas/event.schema';
import { Snapshot, SnapshotSchema } from 'src/db/schemas/snapshot.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GRID_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.GRID,
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'pixelgrid-consumer-' + process.env.GRID,
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: Snapshot.name, schema: SnapshotSchema },
    ]),
  ],
  providers: [
    {
      provide: PixelGridRepository,
      useClass: PixelGridsService,
    },
  ],
  exports: [PixelGridRepository],
})
export class InfrastructureServicesModule {
  constructor() {
    Logger.log(
      'PixelGrid InfrastructureServicesModule initialized for grid: ' +
        process.env.GRID,
      'PixelGridModule',
    );
  }
}
