import { Module } from '@nestjs/common';
import { PixelGridsService } from './dashboard.service';
import { PixelGridsRepository } from '../core/pixel-grids-repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DASHBOARD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'dashboard',
          port: 9001,
        },
      },
    ]),
  ],
  providers: [
    {
      provide: PixelGridsRepository,
      useClass: PixelGridsService,
    },
  ],
  exports: [PixelGridsRepository],
})
export class InfrastructureServicesModule {}
