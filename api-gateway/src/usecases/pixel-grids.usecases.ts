import { Injectable } from '@nestjs/common';
import { PixelGridsRepository } from 'src/core/pixel-grids-repository';

@Injectable()
export class PixelGridsUseCases {
  constructor(private repository: PixelGridsRepository) {}

  getGridState(gridId: string): Promise<any> {
    return this.repository.getGridState(gridId);
  }
}
