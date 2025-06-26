import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from 'apps/auth/src/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'apps/products/src/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true, // This makes it available app-wide
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb+srv://madanwalevenkateshj:guqbWxgK5KVq9h9w@cluster0.w3gibek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    ConfigModule.forRoot(),
    ProductsModule,],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
