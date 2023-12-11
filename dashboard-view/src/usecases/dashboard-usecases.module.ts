import { Module } from '@nestjs/common';
import { DashboardUseCases } from './dashboard.usecases';
import { DashboardViewServicesModule } from 'src/services/dashboard.service';

@Module({
  imports: [DashboardViewServicesModule],
  providers: [DashboardUseCases],
  exports: [DashboardUseCases],
})
export class DashboardUseCasesModule {}
