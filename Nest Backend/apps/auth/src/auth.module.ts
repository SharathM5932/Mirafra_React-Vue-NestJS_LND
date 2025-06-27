import { Module, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy"; // <-- Import your JwtStrategy here
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal:true,
        envFilePath:'apps/auth/.env'
      }
    ),
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('USER_SERVICE_HOST'),
            port: config.get<number>('USER_SERVICE_PORT'),
          },
        }),
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),

    //node Mailer
          MailerModule.forRoot({
            transport: {
                host: "smtp.gmail.com",
                //   port: 587,
                secure: true, // true for port 465, false for other ports
                auth: {
                    user: "shruthimr2003@gmail.com",
                    pass: "yfnw ezrd tkov hebr",
                },
            },
            defaults: {
                from: "No Reply <no-reply@example.com>"
            },
            template: {
                dir: join(__dirname, '..', 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        })
  ],
  providers: [
    AuthService,
    JwtStrategy,  // <-- Add JwtStrategy to providers
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    PassportModule,
    JwtModule,
    JwtStrategy, // <-- Export it if you want to reuse the strategy in other modules
  ],
})
export class AuthModule {}
