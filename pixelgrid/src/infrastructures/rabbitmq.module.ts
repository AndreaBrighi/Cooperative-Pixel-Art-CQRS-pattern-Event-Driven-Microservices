import { Module } from '@nestjs/common';
import { PixelGridsService } from './rabbitmq.service';
import { PixelGridRepository } from '../core/pixel-grids-repository';

@Module({
  imports: [],
  providers: [
    {
      provide: PixelGridRepository,
      useClass: PixelGridsService,
    },
  ],
  exports: [PixelGridRepository],
})
export class InfrastructureServicesModule {}
