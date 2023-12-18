import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PixelGridsRepository } from '../core/pixel-grids-repository';

@Injectable()
export class PixelGridsService implements PixelGridsRepository {
  constructor(
    @Inject('DASHBOARD_SERVICE') private clientTCP: ClientProxy,
    @Inject('GRID_SERVICE') private clientKafka: ClientProxy,
  ) {}

  getGridState(gridId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clientTCP
        .send<string, string>('get_grid', gridId)
        .pipe(catchError(async (val) => reject(val)))
        .subscribe((value) => resolve(value));
    });
  }

  colorateGrid(gridId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clientKafka
        .emit<string, string>('colorate_grid', gridId)
        .pipe(catchError(async (val) => reject(val)))
        .subscribe((value) => resolve(value));
    });
  }
}
