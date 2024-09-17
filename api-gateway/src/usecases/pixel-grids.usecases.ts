import { Injectable } from '@nestjs/common';
import { PointDto } from 'src/controllers/dto/PointDto';
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

  colorateGrid(gridId: string, color: string, point: PointDto): Promise<any> {
    return this.repository.colorateGrid(gridId, color, point);
  }
}
