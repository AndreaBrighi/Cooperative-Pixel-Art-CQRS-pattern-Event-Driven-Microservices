import { Inject, Injectable } from '@nestjs/common';
import { PixelGridRepository } from '../core/pixel-grids-repository';
import { ColorPixelEvent } from '../core/ColorPixelEvent';
import { ClientKafka } from '@nestjs/microservices';
import { eventDTO } from '../controllers/dto/EventDto';

@Injectable()
export class PixelGridsService implements PixelGridRepository {
  constructor(@Inject('GRID_SERVICE') private clientKafka: ClientKafka) {
    this.clientKafka.emit('grid_created', process.env.GRID);
  }

  colorGrid(grid: string, event: ColorPixelEvent){
    this.clientKafka.emit<string, string>('color_pixel', JSON.stringify(new eventDTO(grid, event.color, event.pixel)));
  }
}

