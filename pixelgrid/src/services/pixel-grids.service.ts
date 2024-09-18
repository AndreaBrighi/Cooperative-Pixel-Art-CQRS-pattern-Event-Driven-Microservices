import { Module } from '@nestjs/common';
import { InfrastructureServicesModule } from '../infrastructures/infrastucture.module';

@Module({
  imports: [InfrastructureServicesModule],
  exports: [InfrastructureServicesModule],
})
export class PixelGridServicesModule {}
