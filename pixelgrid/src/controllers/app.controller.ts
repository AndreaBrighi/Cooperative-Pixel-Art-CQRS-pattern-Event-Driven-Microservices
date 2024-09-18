import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PixelGridUseCases } from 'src/usecases/pixel-grids.usecases';
import { ColorPixelCommand } from './dto/colorPixelCommand';
import { eventDTO } from './dto/EventDto';

@Controller()
export class PixelGridController {

  public static get grid(): string { return process.env.GRID}

  constructor(private readonly pixelGridService: PixelGridUseCases) {}

  @MessagePattern('colorate_grid.' + PixelGridController.grid)
  coloratePixel(command: ColorPixelCommand) {
    Logger.log(command, 'Colorate');
    this.pixelGridService.ColorPixelInGrid(new eventDTO(PixelGridController.grid, command.color, command.point));
    return true;
  }
}
