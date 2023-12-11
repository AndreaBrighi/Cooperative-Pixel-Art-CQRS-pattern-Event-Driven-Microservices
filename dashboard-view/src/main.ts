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
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envServerSchema.HOSTNAME,
        port: envServerSchema.PORT,
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
