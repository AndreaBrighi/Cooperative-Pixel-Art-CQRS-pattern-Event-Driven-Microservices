import { Module } from '@nestjs/common';
import { PixelGridController } from './controllers/app.controller';
import { PixelGridUseCasesModule } from './usecases/pixel-grid-usecases.module';
import { PixelGridServicesModule } from './services/pixel-grids.service';

@Module({
  imports: [PixelGridUseCasesModule, PixelGridServicesModule],
  controllers: [PixelGridController],
  providers: [],
})
export class AppModule {}
