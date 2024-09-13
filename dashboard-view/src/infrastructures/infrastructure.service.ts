import { Inject, Injectable } from '@nestjs/common';
import { DashboardRepository } from 'src/core/dashboardRepository';
import { ColorPixelEvent } from 'src/core/ColorPixelEvent';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PixelGridsService implements DashboardRepository {

  constructor(@Inject('BROKER_SERVICE') private client: ClientProxy) {}

  updateGrid(grid: string, event: ColorPixelEvent) {
    this.client.emit(grid, event);
  }
}
