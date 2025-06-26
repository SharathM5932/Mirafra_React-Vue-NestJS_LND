import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CartModule } from './cart.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(CartModule)
    app.useGlobalPipes(new ValidationPipe());
    const config = app.get(ConfigService)
    //HTTP configs
    const port = config.get<number>("CART_PORT")

    //TCP port and host configs
    const tcpPort = config.get<number>("CART_TCP_PORT")
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: config.get<string>("CART_TCP_HOST"),
            port: tcpPort
        }
    })
    app.enableCors()
    
    await app.startAllMicroservices()
    await app.listen(port ?? 3004);
    console.log(`CART micro service listening on port ${port ?? 3004}`)
}
bootstrap();