import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ProductsModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PRODUCT_PORT');
  const tcpPort = config.get<number>('PRODUCT_TCP_PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get<string>('PRODUCT_TCP_HOST'),
      port: tcpPort
    }
  });

  // Serve static files from correct path
  app.useStaticAssets(join(process.cwd(), 'apps/product/prodimg'), {
    prefix: '/prodimgs/'
  });

  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(port || 3002);
  console.log(`Product microservice running at port ${port || 3002}`);
}
bootstrap();
