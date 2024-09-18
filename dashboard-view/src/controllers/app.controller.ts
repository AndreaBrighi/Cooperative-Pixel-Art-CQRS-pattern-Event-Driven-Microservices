import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { PixelGrid } from 'src/core/pixelGrid';
import { DashboardUseCases } from '../usecases/dashboard.usecases';
import {PixelGridDto, convertToDto} from './dto/PixelGridDto'

@Controller()
export class DashboardViewController {
  constructor(private readonly dashboardService: DashboardUseCases) {}

  @MessagePattern('get_grid', Transport.TCP)
  getGrid(@Payload() gridId: string): PixelGridDto {
    Logger.log(gridId, 'Dashboard');
    return convertToDto(this.dashboardService.getPixelGrid(gridId));
  }

  @EventPattern('color_pixel', Transport.KAFKA)
  colorPixel(@Payload() data: { gridId: string; x: number; y: number; color: string }) {
    Logger.log(data, 'Dashboard');
  }
}
