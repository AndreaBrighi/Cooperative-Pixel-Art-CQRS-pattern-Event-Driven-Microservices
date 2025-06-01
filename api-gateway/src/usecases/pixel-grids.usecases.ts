import { Injectable } from '@nestjs/common';
import { PointDto } from 'src/controllers/dto/PointDto';
import { PixelGridsRepository } from 'src/core/pixel-grids-repository';

@Injectable()
export class PixelGridsUseCases {
  //private allGrid = [];

  constructor(private repository: PixelGridsRepository) {}

  getAllGrids(): Promise<any> {
    return this.repository.getAllGrids();
  }

  getGridState(gridId: string): Promise<any> {
    return this.repository.getGridState(gridId);
  }

  colorateGrid(gridId: string, color: string, point: PointDto): Promise<any> {
    return this.repository.colorateGrid(gridId, color, point);
  }
}
