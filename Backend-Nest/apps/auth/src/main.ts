import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips properties not defined in DTOs
    forbidNonWhitelisted: true, // throws an error for extra properties
    transform: true, // enables class-transformer
  }));
  
  // HTTP server config
  const httpPort = config.get<number>('AUTH_PORT') ?? 3000;

  // TCP microservice config
  const tcpHost = config.get<string>('AUTH_TCP_HOST') ?? '127.0.0.1';
  const tcpPort = config.get<number>('AUTH_TCP_PORT') ?? 4001;

  // Connect microservice (TCP)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: tcpPort,
    },
  });

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(httpPort);

  console.log(`Auth HTTP service running on port ${httpPort}`);
  console.log(`Auth microservice (TCP) listening on ${tcpHost}:${tcpPort}`);
}
bootstrap();