import { Injectable } from '@nestjs/common';
import { PixelGridRepository } from 'src/core/pixel-grids-repository';
import { ColorPixelEvent } from 'src/core/ColorPixelEvent';

@Injectable()
export class PixelGridsService implements PixelGridRepository {
  constructor() {}

  updateGrid(grid: string, event: ColorPixelEvent) {}
}
