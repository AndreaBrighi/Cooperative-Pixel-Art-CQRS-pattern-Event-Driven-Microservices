import { Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PixelGridsUseCases } from '../usecases/pixel-grids.usecases';

@Controller('pixel-grids')
export class PixelGridController {
  constructor(private readonly pixelGridsUseCase: PixelGridsUseCases) {}

  /*@Get()
  getPixelGrids(): string[] {
    return this.pixelGridsUseCase.getPixelGrids();
  }*/

  @Get(':gridId')
  async getPixelGridState(@Param('gridId') gridId: string) {
    Logger.log(gridId);
    return this.pixelGridsUseCase.getGridState(gridId);
  }

  @Post(':gridId/color-pixel/:color')
  setColorForPixelInGrid(
    @Param('gridId') gridId: string,
    @Param('color') color: string,
  ): number {
    Logger.log(gridId);
    Logger.log(color);
    return 0;
  }
}
