import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PixelGridsUseCases } from '../usecases/pixel-grids.usecases';
import { PointDto } from './dto/PointDto';

@Controller('pixel-grids')
export class PixelGridController {
  constructor(private readonly pixelGridsUseCase: PixelGridsUseCases) {}

  @Get()
  getPixelGrids(): string[] {
    return this.pixelGridsUseCase.getAllGrid();
  }

  @Get(':gridId')
  async getPixelGridState(@Param('gridId') gridId: string) {
    Logger.log(gridId);
    return this.pixelGridsUseCase.getGridState(gridId);
  }

  @Post(':gridId/color-pixel/:color')
  setColorForPixelInGrid(
    @Param('gridId') gridId: string,
    @Param('color') color: string,
    @Body() point: PointDto,
  ): number {
    Logger.log(gridId);
    Logger.log(color);
    Logger.log(point);
    return 0;
  }
}
