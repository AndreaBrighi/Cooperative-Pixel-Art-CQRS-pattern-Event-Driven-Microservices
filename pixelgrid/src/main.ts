import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { z } from 'zod';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const envSchema = z.object({
    PORT: z.coerce.number().default(9002),
    HOSTNAME: z.string().default('127.0.0.1'),
  });
  const envServerSchema = envSchema.parse(process.env);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );
  await app.listen().then(() => {
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
