import { Injectable, Logger } from '@nestjs/common';
import { PixelGrid } from '../core/pixelGrid';
import { DashboardRepository } from '../core/dashboardRepository';
import { Point } from '../core/Point';

@Injectable()
export class DashboardUseCases {
  //private whiteGrid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => "#FFFFFF"))
  private dictionary: { [key: string]: PixelGrid } = {};

  private createWhiteGrid(): string[][] {
    return Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => "#FFFFFF"));
  };


  constructor(private repository: DashboardRepository) {

    //this.dictionary["Grid1"] = new PixelGrid(10, 10, this.whiteGrid);
    for (const grid of Object.keys(this.dictionary)) {
      Logger.log(grid);
      this.dictionary[grid].observer.subscribe(event =>{
        this.repository.updateGrid(grid, event);
      });
    }
  }

  getAllGrids(): string[] {
    Logger.log('get_all_grids', 'Dashboard');
    return this.dictionary ? Object.keys(this.dictionary) : [];
  }

  createPixelGrid(gridId: string): void {
    if (!this.dictionary[gridId]) {
      this.dictionary[gridId] = new PixelGrid(10, 10, this.createWhiteGrid());
      this.repository.createGrid(gridId);
      Logger.log(gridId);
      this.dictionary[gridId].observer.subscribe(event =>{
        this.repository.updateGrid(gridId, event);
      });
      
      Logger.log(`Grid ${gridId} created.`);
    } else {
      Logger.warn(`Grid ${gridId} already exists.`);
    }
  }

  getAllGrid(): string[] {
    return Object.keys(this.dictionary);
  }

  getPixelGrid(grid: string): PixelGrid {
    return this.dictionary[grid];
  }

  colorPixel(grid: string, point: Point, color: string): void {
    this.dictionary[grid].colorPixel(point.x, point.y , color);
  }
}
