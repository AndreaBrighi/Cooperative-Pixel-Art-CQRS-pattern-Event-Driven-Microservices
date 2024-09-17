import { Injectable } from '@nestjs/common';
import { eventDTO } from 'src/controllers/dto/EventDto';
import { PixelGridRepository as PixelGridRepository } from 'src/core/pixel-grids-repository';

@Injectable()
export class PixelGridUseCases {
  private eventList: eventDTO[] = [];

  constructor(private repository: PixelGridRepository) {}

  ColorPixelInGrid(event: eventDTO) {
    return this.eventList.push(event);
  }
}
