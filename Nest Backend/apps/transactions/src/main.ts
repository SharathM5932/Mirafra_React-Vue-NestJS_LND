import { NestFactory } from '@nestjs/core';
import { TransactionsModule } from './transactions.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create the Nest app instance (HTTP server)
  const app = await NestFactory.create(TransactionsModule);

  // Get ConfigService instance to read environment variables
  const config = app.get(ConfigService);

  // Read HTTP and TCP ports from environment or fallback to default
  const httpPort = config.get<number>('TRANSACTIONS_HTTP_PORT') || 3004;
  const tcpPort = config.get<number>('TRANSACTIONS_TCP_PORT') || 3006;
  const tcpHost = config.get<string>('TRANSACTIONS_TCP_HOST') || '127.0.0.1';

  // Setup TCP microservice for inter-service communication
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: tcpPort,
    },
  });

  // Enable CORS for HTTP server
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Start the TCP microservice
  await app.startAllMicroservices();

  // Start HTTP server
  await app.listen(httpPort);

  console.log(`Transactions service is listening on HTTP port ${httpPort} and TCP port ${tcpPort}`);
}

bootstrap();
