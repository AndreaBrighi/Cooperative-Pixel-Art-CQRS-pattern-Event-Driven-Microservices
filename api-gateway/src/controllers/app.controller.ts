import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PixelGridsUseCases } from '../usecases/pixel-grids.usecases';
//import { Admin, Kafka } from 'kafkajs';
import { PixelDto } from './dto/PixelDto';

@Controller('pixel-grids')
export class GatewayController {
  //private admin: Admin;
  constructor(private readonly pixelGridsUseCase: PixelGridsUseCases) {}

  @Get()
  async getPixelGrids() {
    Logger.log('GET');
    return this.pixelGridsUseCase.getAllGrids();
  }

  @Get(':gridId')
  async getPixelGridState(@Param('gridId') gridId: string) {
    Logger.log('GET ' + gridId);
    return this.pixelGridsUseCase.getGridState(gridId);
  }

  @Post(':gridId/color-pixel')
  async setColorForPixelInGrid(
    @Param('gridId') gridId: string,
    @Body() pixel: PixelDto,
  ) {
    Logger.log('POST ' + gridId + ' ' + pixel.color + ' ' + pixel.point);
    return this.pixelGridsUseCase.colorateGrid(
      gridId,
      pixel.color,
      pixel.point,
    );
  }
}
