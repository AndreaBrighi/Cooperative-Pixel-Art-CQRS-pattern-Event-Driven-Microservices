import { Module } from '@nestjs/common';
import { InfrastructureServicesModule } from 'src/infrastructures/infrustructure.module';

@Module({
  imports: [InfrastructureServicesModule],
  exports: [InfrastructureServicesModule],
})
export class DashboardViewServicesModule {}
