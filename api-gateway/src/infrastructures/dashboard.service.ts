import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PixelGridsRepository } from '../core/pixel-grids-repository';

@Injectable()
export class PixelGridsService implements PixelGridsRepository {
  constructor(@Inject('DASHBOARD_SERVICE') private client: ClientProxy) {}

  getGridState(gridId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .send<string, string>('sum', gridId)
        .pipe(catchError(async (val) => reject(val)))
        .subscribe((value) => resolve(value));
    });
  }
}
