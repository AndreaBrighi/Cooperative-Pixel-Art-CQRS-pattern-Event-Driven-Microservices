import { Module } from '@nestjs/common';
import { GatewayController } from './controllers/app.controller';
import { PixelGridsUseCasesModule } from 'src/usecases/pixel-grids-usecases.module';
import { PixelGridsServicesModule } from './services/pixel-grids.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PixelGridsUseCasesModule,
    PixelGridsServicesModule,
    ClientsModule.register([
      {
        name: 'GRID_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'app-gateway',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'kafka-microservices',
          },
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class AppModule {}
