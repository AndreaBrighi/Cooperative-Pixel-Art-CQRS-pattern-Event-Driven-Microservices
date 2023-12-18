import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { PixelGridUseCases } from 'src/usecases/pixel-grids.usecases';
import { eventDTO } from './dto/EventDto';

@Controller()
export class PixelGridController {
  constructor(private readonly pixelGridService: PixelGridUseCases) {}

  @MessagePattern('colorate_grid')
  colorarePizel(event: eventDTO): string {
    Logger.log(event, 'Colorate');
    return event.color;
  }
}
