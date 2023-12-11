import { Module } from '@nestjs/common';
import { DashboardViewController } from './controllers/app.controller';
import { DashboardUseCasesModule } from './usecases/dashboard-usecases.module';
import { DashboardViewServicesModule } from './services/pixel-grids.service';

@Module({
  imports: [DashboardUseCasesModule, DashboardViewServicesModule],
  controllers: [DashboardViewController],
  providers: [],
})
export class AppModule {}
