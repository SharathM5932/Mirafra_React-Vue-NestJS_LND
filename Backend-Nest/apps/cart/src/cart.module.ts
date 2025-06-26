import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Cart, CartSchema } from './cart.schema';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cart, CartSchema } from './cart.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/cart/.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

  ],

  providers: [CartService],
  controllers: [CartController],
})
export class CartModule { }
