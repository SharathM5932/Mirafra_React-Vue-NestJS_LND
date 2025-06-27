import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  //HTTP communication b/w postman and product
  //this is the http layer
  const app = await NestFactory.create(CategoryModule);

  //adding ConfigService as a middleware for .env files/configuration
  const config = app.get(ConfigService)

  //registering the port number for product http
  const port = config.get<number>('CATEGORY_PORT')

  //TCP communication(Interservice) and registering tcp microservice
  //setting the port no for TCP communication for other service to communicate to Product
  const tcpPort = config.get<number>("CATEGORY_TCP_PORT")

  //register TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get<string>('CATEGORY_TCP_HOST'),
      port: tcpPort
    }
  })

  app.enableCors({
    origin: '*',
    credential: true
  })
  //start tcp microservice
  await app.startAllMicroservices()

  //start http server for image upload , CRUD operations etc
  await app.listen(port || 3003)

} bootstrap()