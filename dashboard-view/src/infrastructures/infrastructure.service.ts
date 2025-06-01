import { Inject, Injectable, Logger } from '@nestjs/common';
import { DashboardRepository } from 'src/core/dashboardRepository';
import { ColorPixelEvent } from 'src/core/ColorPixelEvent';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PixelGridsService implements DashboardRepository {

  constructor(@Inject('BROKER_SERVICE') private client: ClientProxy) {}

  createGrid(gridId: string): void {
    Logger.log(`Grid ${gridId} created.`);
    this.client.connect().then(()=>{
      this.client.emit<string>(gridId, "created");
    });
  }

  updateGrid(grid: string, event: ColorPixelEvent) {
    Logger.log("event sent "+ grid)
    this.client.connect().then(()=>{
      this.client.emit<string, ColorPixelEvent>(grid, event)
    });
  }
}
