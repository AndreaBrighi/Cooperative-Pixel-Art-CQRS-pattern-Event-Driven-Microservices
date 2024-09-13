import { Injectable, Logger } from '@nestjs/common';
import { PixelGrid } from 'src/core/pixelGrid';
import { DashboardRepository } from 'src/core/dashboardRepository';

@Injectable()
export class DashboardUseCases {
  private whiteGrid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => "#FFFFFF"))
  private dictionary: { [key: string]: PixelGrid } = {};


  constructor(private repository: DashboardRepository) {

    this.dictionary["Grid1"] = new PixelGrid(10, 10, this.whiteGrid);
    Logger.log(this.dictionary)
    Logger.log(Object.keys(this.dictionary))
    for (const grid of Object.keys(this.dictionary)) {
      Logger.log(grid);
      this.dictionary[grid].observer.subscribe(event =>
        repository.updateGrid(grid, event)
      );
    }
  }

  getAllGrid(): string[] {
    return Object.keys(this.dictionary);
  }

  getPixelGrid(grid: string): PixelGrid {
    return this.dictionary[grid];
  }

  updateGrid(grid: string) {
    return this.dictionary[grid].colorPixel(0, 0, '');
  }
}
