// products.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsGatewayController } from './products.controller';
import { config } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/products/.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    // ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/category/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'CATEGORY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('CATEGORY_TCP_HOST', 'localhost'),
            port: config.get<number>('CATEGORY_TCP_PORT', 3008),
          },
        }),
      },
    ])
  ],
  providers: [ProductsService],
  controllers: [ProductsGatewayController],
})
export class ProductsModule { }
