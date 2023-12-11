import { Module } from '@nestjs/common';
import { DashboardUseCases } from './pixel-grids.usecases';
import { DashboardViewServicesModule } from 'src/services/pixel-grids.service';

@Module({
  imports: [DashboardViewServicesModule],
  providers: [DashboardUseCases],
  exports: [DashboardUseCases],
})
export class DashboardUseCasesModule {}
