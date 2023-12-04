import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PixelGridController } from './app.controller';
import { PixelGridService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GRIDS_SERVICE',
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
  controllers: [PixelGridController],
  providers: [PixelGridService],
})
export class AppModule {}
