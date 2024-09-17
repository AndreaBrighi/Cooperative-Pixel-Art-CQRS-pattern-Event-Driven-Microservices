import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { PixelGridsUseCases } from '../usecases/pixel-grids.usecases';
//import { Admin, Kafka } from 'kafkajs';
import { PixelDto } from './dto/PixelDto';
import { ClientKafka } from '@nestjs/microservices';

@Controller('pixel-grids')
export class GatewayController {
  //private admin: Admin;
  constructor(
    private readonly pixelGridsUseCase: PixelGridsUseCases,
    @Inject('GRID_SERVICE') private client: ClientKafka,
  ) {}

  async onModuleInit() {
  }

  @Get()
  getPixelGrids(): string[] {
    Logger.log('GET');
    return this.pixelGridsUseCase.getAllGrid();
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
