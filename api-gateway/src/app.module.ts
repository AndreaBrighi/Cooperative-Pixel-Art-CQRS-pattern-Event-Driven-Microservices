import { Module } from '@nestjs/common';
import { PixelGridController } from './controllers/app.controller';
import { PixelGridsUseCasesModule } from 'src/usecases/pixel-grids-usecases.module';
import { PixelGridsServicesModule } from './services/pixel-grids.service';

@Module({
  imports: [PixelGridsUseCasesModule, PixelGridsServicesModule],
  controllers: [PixelGridController],
  providers: [],
})
export class AppModule {}
