import { Injectable } from '@nestjs/common';
import { PixelGridsRepository } from 'src/core/pixel-grids-repository';

@Injectable()
export class PixelGridsUseCases {
  private allGrid = ['Grid1'];

  constructor(private repository: PixelGridsRepository) {}

  getAllGrid(): string[] {
    return this.allGrid;
  }

  getGridState(gridId: string): Promise<any> {
    return this.repository.getGridState(gridId);
  }
}
