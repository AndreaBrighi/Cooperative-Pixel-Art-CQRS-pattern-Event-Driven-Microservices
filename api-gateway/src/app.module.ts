import { Module } from '@nestjs/common';
import { GatewayController } from './controllers/app.controller';
import { PixelGridsUseCasesModule } from 'src/usecases/pixel-grids-usecases.module';
import { PixelGridsServicesModule } from './services/pixel-grids.service';

@Module({
  imports: [PixelGridsUseCasesModule, PixelGridsServicesModule],
  controllers: [GatewayController],
  providers: [],
})
export class AppModule {}
