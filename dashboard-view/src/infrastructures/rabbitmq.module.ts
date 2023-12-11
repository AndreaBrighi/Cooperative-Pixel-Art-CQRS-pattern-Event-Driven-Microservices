import { Module } from '@nestjs/common';
import { PixelGridsService } from './rabbitmq.service';
import { DashboardRepository } from '../core/dashboard-repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DASHBOARD_EVENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: DashboardRepository,
      useClass: PixelGridsService,
    },
  ],
  exports: [DashboardRepository],
})
export class InfrastructureServicesModule {}
