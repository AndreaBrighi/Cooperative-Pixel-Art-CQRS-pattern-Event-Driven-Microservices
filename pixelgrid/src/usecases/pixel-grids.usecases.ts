import { Injectable } from '@nestjs/common';
import { eventDTO } from 'src/controllers/dto/EventDto';
import { ColorPixelEvent } from '../core/ColorPixelEvent';
import { PixelGridRepository as PixelGridRepository } from '../core/pixel-grids-repository';

@Injectable()
export class PixelGridUseCases {
  private eventList: eventDTO[] = [];

  constructor(private repository: PixelGridRepository) {}

  ColorPixelInGrid(event: eventDTO) {
    this.repository.colorGrid(
      event.grid,
      new ColorPixelEvent(event.pixel, event.color),
    );
    return this.eventList.push(event);
  }
}
