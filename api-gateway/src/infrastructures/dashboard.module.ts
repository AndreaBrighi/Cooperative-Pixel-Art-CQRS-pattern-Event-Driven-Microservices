import { Module } from '@nestjs/common';
import { PixelGridsService } from './dashboard.service';
import { PixelGridsRepository } from '../core/pixel-grids-repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DASHBOARD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'dashboard',
          port: 9001,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'GRID_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'app-gateway',
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
      provide: PixelGridsRepository,
      useClass: PixelGridsService,
    },
  ],
  exports: [PixelGridsRepository],
})
export class InfrastructureServicesModule {}
