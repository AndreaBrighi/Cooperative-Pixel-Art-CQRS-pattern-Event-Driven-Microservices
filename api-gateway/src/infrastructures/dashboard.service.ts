import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PixelGridsRepository } from '../core/pixel-grids-repository';
import { PointDto } from '../controllers/dto/PointDto';
import { ColorPixelCommand } from './dto/colorPixelCommand';

@Injectable()
export class PixelGridsService implements PixelGridsRepository {
  private subscribedGrids = new Set<string>();
  constructor(
    @Inject('DASHBOARD_SERVICE') private clientTCP: ClientProxy,
    @Inject('GRID_SERVICE') private clientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    
  }

  getAllGrids(): Promise<any> {
    return this.clientTCP.send<string, string>('get_all_grids', '').toPromise();
  }

  getGridState(gridId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.clientTCP
        .send<string, string>('get_grid', gridId)
        .pipe(catchError(async (val) => reject(val)))
        .subscribe((value) => resolve(value));
    });
  }

  async colorateGrid(gridId: string, color: string, point: PointDto): Promise<any> {
    const topic = "colorate_grid." + gridId; // gridId should be alphanumeric, no spaces
    if (!this.subscribedGrids.has(topic)) {
      this.clientKafka.subscribeToResponseOf(topic);
      await this.clientKafka.connect();
      this.subscribedGrids.add(topic);
    }
    return this.clientKafka
      .send<string, string>(
        topic,
        JSON.stringify(new ColorPixelCommand(color, point)),
      )
      .toPromise();
  }
}
