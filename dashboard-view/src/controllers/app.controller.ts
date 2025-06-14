import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { DashboardUseCases } from '../usecases/dashboard.usecases';
import {PixelGridDto, convertToDto} from './dto/PixelGridDto'
import { eventDTO } from './dto/EventDto';

@Controller()
export class DashboardViewController {
  constructor(private readonly dashboardService: DashboardUseCases) {}

  @MessagePattern('get_all_grids', Transport.TCP)
  getAllGrids(): string[] {
    Logger.log('get_all_grids', 'Dashboard');
    return this.dashboardService.getAllGrids();
  }

  @MessagePattern('get_grid', Transport.TCP)
  getGrid(@Payload() gridId: string): PixelGridDto {
    Logger.log(gridId, 'Dashboard');
    return convertToDto(this.dashboardService.getPixelGrid(gridId));
  }

  @EventPattern('color_pixel', Transport.KAFKA)
  colorPixel(@Payload() data: eventDTO) {
    Logger.log(data, 'Dashboard');
    console.dir(data);
    this.dashboardService.colorPixel(data.grid, data.pixel, data.color);
  }

  @EventPattern('grid_created', Transport.KAFKA)
  gridCreated(@Payload() gridId: string) {
    Logger.log(gridId, 'Dashboard');
    this.dashboardService.createPixelGrid(gridId);
  }
}
