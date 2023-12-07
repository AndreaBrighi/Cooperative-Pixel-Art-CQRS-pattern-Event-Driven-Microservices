import { Module } from '@nestjs/common';
import { InfrastructureServicesModule } from '../infrastructures/dashboard.module';

@Module({
  imports: [InfrastructureServicesModule],
  exports: [InfrastructureServicesModule],
})
export class PixelGridsServicesModule {}
