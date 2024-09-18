import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { z } from 'zod';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const envSchema = z.object({
    PORT: z.coerce.number().default(9001),
    HOSTNAME: z.string().default('127.0.0.1'),
  });
  const envServerSchema = envSchema.parse(process.env);
  const app = await NestFactory.create(AppModule);
  // microservice #1
  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        host: envServerSchema.HOSTNAME,
        port: envServerSchema.PORT,
      },
    },
  );
  // microservice #2
  const microserviceKafka = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
    },
  });

  await app.startAllMicroservices().then(() => {
    Logger.log(
      'Server listening: ' +
        envServerSchema.HOSTNAME! +
        ':' +
        envServerSchema.PORT!,
      'Server',
    );
  });
}
bootstrap();
