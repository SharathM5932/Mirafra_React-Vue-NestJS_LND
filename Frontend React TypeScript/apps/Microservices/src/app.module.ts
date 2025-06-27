import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'apps/product/src/products.module';
import { CategoryModule } from 'apps/category/src/category.module';
import { UsersModule } from 'apps/user/src/user.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionsModule } from 'apps/transactions/src/transactions.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3002 },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3003 },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3004 },
      },
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3005 },
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    CategoryModule,
    UsersModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
