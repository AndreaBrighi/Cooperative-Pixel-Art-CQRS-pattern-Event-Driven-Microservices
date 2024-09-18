import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PixelGridsRepository } from '../core/pixel-grids-repository';
import { PointDto } from '../controllers/dto/PointDto';
import { ColorPixelCommand } from './dto/colorPixelCommand';

@Injectable()
export class PixelGridsService implements PixelGridsRepository {
  constructor(
    @Inject('DASHBOARD_SERVICE') private clientTCP: ClientProxy,
    @Inject('GRID_SERVICE') private clientKafka: ClientKafka,
  ) {}

  getGridState(gridId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clientTCP
        .send<string, string>('get_grid', gridId)
        .pipe(catchError(async (val) => reject(val)))
        .subscribe((value) => resolve(value));
    });
  }

  colorateGrid(gridId: string, color: string, point: PointDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clientKafka.subscribeToResponseOf('colorate_grid.'+ gridId);
      this.clientKafka.connect().then(() => {
        this.clientKafka
          .send<string, string>(
            'colorate_grid.' + gridId,
            JSON.stringify(new ColorPixelCommand(color, point)),
          )
          .pipe(catchError(async (val) => reject(val)))
          .subscribe((value) => resolve(value));
      });
    });
  }
}
