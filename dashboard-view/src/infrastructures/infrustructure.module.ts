import { Module } from '@nestjs/common';
import { PixelGridsService } from './infrastructure.service';
import { DashboardRepository } from '../core/dashboardRepository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'BROKER_SERVICE',
      transport: Transport.MQTT,
      options: {
        url: 'ws://rabbitmq:15675/ws',
        subscribeOptions: {
          qos: 2
        },
      }
    },
  ])],
  providers: [
    {
      provide: DashboardRepository,
      useClass: PixelGridsService,
    },
  ],
  exports: [DashboardRepository],
})
export class InfrastructureServicesModule {}
