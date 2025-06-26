import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/user/.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: 'mongodb+srv://madanwalevenkateshj:guqbWxgK5KVq9h9w@cluster0.w3gibek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      }),
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
