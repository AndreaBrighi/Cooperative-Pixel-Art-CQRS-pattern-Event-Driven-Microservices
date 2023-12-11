import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DashboardUseCases } from 'src/usecases/pixel-grids.usecases';

@Controller()
export class DashboardViewController {
  constructor(private readonly dashboardService: DashboardUseCases) {}

  @MessagePattern('sum')
  accumulate(@Payload() gridId: any): string {
    Logger.log(gridId, 'Dashboard');
    this.dashboardService.updateGrid(gridId);
    return gridId;
  }
}
