import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DashboardUseCases } from 'src/usecases/dashboard.usecases';

@Controller()
export class DashboardViewController {
  constructor(private readonly dashboardService: DashboardUseCases) {}

  @MessagePattern('get_grid')
  accumulate(@Payload() gridId: string): string {
    Logger.log(gridId, 'Dashboard');
    this.dashboardService.updateGrid(gridId);
    return gridId;
  }
}
