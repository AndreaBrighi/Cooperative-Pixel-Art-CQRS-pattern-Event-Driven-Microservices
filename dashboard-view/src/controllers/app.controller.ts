import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PixelGrid } from 'src/core/pixelGrid';
import { DashboardUseCases } from '../usecases/dashboard.usecases';
import {PixelGridDto, convertToDto} from './dto/PixelGridDto'

@Controller()
export class DashboardViewController {
  constructor(private readonly dashboardService: DashboardUseCases) {}

  @MessagePattern('get_grid')
  getGrid(@Payload() gridId: string): PixelGridDto {
    Logger.log(gridId, 'Dashboard');
    return convertToDto(this.dashboardService.getPixelGrid(gridId));
  }
}
