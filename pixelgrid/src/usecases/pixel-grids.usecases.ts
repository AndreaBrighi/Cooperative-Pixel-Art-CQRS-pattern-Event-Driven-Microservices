import { Injectable } from '@nestjs/common';
import { pixelGrid } from 'src/core/pixel-grid';
import { PixelGridRepository as PixelGridRepository } from 'src/core/pixel-grids-repository';

@Injectable()
export class PixelGridUseCases {
  private dictionary: Record<string, pixelGrid> = {};

  constructor(private repository: PixelGridRepository) {
    for (const grid in Object.keys(this.dictionary)) {
      this.dictionary[grid].observer().subscribe((event) => {
        repository.updateGrid(grid, event);
      });
    }
  }

  getAllGrid(): string[] {
    return Object.keys(this.dictionary);
  }

  getPixelGrids(grid: string): pixelGrid {
    return this.dictionary[grid];
  }

  updateGrid(grid: string) {
    return this.dictionary[grid].colorPixel(0, 0, '');
  }
}
