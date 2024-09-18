import { Module } from '@nestjs/common';
import { PixelGridsService } from './infrastucture.service';
import { PixelGridRepository } from '../core/pixel-grids-repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register(
    [{
        name: 'GRID_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'grid1',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'kafka-microservices',
          },
        },
      },
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
export class InfrastructureServicesModule {}
