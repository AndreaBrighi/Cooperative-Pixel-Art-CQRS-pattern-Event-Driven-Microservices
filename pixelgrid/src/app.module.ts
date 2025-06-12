import { Module } from '@nestjs/common';
import { PixelGridController } from './controllers/app.controller';
import { PixelGridUseCasesModule } from './usecases/pixel-grid-usecases.module';
import { PixelGridServicesModule } from './services/pixel-grids.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PixelGridUseCasesModule,
    PixelGridServicesModule,
    MongooseModule.forRoot('mongodb://mongodb/pixelgrid'),
  ],
  controllers: [PixelGridController],
  providers: [],
})
export class AppModule {}
