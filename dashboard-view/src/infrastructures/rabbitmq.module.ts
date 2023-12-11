import { Module } from '@nestjs/common';
import { PixelGridsService } from './rabbitmq.service';
import { DashboardRepository } from '../core/dashboard-repository';

@Module({
  imports: [],
  providers: [
    {
      provide: DashboardRepository,
      useClass: PixelGridsService,
    },
  ],
  exports: [DashboardRepository],
})
export class InfrastructureServicesModule {}
