import { Module } from '@nestjs/common';
import { PixelGridUseCases } from './pixel-grids.usecases';
import { PixelGridServicesModule } from 'src/services/pixel-grids.service';

@Module({
  imports: [PixelGridServicesModule],
  providers: [PixelGridUseCases],
  exports: [PixelGridUseCases],
})
export class PixelGridUseCasesModule {}
