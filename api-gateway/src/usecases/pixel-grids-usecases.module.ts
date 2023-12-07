import { Module } from '@nestjs/common';
import { PixelGridsUseCases } from './pixel-grids.usecases';
import { PixelGridsServicesModule } from 'src/services/pixel-grids.service';

@Module({
  imports: [PixelGridsServicesModule],
  providers: [PixelGridsUseCases],
  exports: [PixelGridsUseCases],
})
export class PixelGridsUseCasesModule {}
