import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PixelGridUseCases } from 'src/usecases/pixel-grids.usecases';

@Controller()
export class PixelGridController {
  constructor(private readonly dashboardService: PixelGridUseCases) {}

  @MessagePattern('get_grid')
  accumulate(@Payload() gridId: string): string {
    Logger.log(gridId, 'Dashboard');
    this.dashboardService.updateGrid(gridId);
    return gridId;
  }
}
