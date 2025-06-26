import { NestFactory } from '@nestjs/core';
import { UsersModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const config = app.get(ConfigService);

  // HTTP server config
  const httpPort = config.get<number>('USER_PORT') ?? 3001;

  // TCP microservice config
  const tcpHost = config.get<string>('USER_TCP_HOST') ?? '127.0.0.1';
  const tcpPort = config.get<number>('USER_TCP_PORT') ?? 4006;

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

  console.log(`User HTTP service running on port ${httpPort}`);
  console.log(`User microservice (TCP) listening on ${tcpHost}:${tcpPort}`);
}
bootstrap();
