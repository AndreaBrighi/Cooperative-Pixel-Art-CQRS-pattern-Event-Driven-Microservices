import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PixelGridUseCases } from 'src/usecases/pixel-grids.usecases';
import { eventDTO } from './dto/EventDto';

@Controller()
export class PixelGridController {
  constructor(private readonly pixelGridService: PixelGridUseCases) {}

  @MessagePattern('colorate_grid.' + process.env.GRID)
  colorarePixel(@Payload() event: eventDTO) {
    Logger.log(event, 'Colorate');
    this.pixelGridService.ColorPixelInGrid(event);
    return event.color;
  }
}
