import { Controller, Post, Body, HttpCode, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService, // Properly injected
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: registerDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.sendResetLink(dto);
  }

  // @Post('reset-password')
  // async resetPassword(@Body() dto: { token: string; newPassword: string }) {
  //   return this.authService.resetPassword(dto.token, dto.newPassword);
  // }
  @Post('reset-password')
  async resetPassword(@Body() dto: { token: string; newPassword: string }) {
    try {
      const result = await this.authService.resetPassword(
        dto.token,
        dto.newPassword,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Password reset failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('test-email')
  async testEmail() {
    try {
      await this.mailerService.sendMail({
        to: 'samchrstopher@gmail.com',
        subject: 'TEST EMAIL',
        text: 'This is a test email',
        html: '<b>HTML version</b>',
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stack: error.stack, // For debugging
      };
    }
  }

  @Get('service-status')
  async checkServiceStatus() {
    try {
      const response = await firstValueFrom(
        this.userClient
          .send({ cmd: 'find-user-by-email' }, 'test@test.com')
          .pipe(timeout(3000)),
      );
      return { userService: 'reachable' };
    } catch (error) {
      return {
        userService: 'unreachable',
        error: error.message,
        stack: error.stack, // For debugging
      };
    }
  }
  // Add to auth.controller.ts
  @Get('test-connection')
  async testConnection() {
    try {
      const response = await firstValueFrom(
        this.userClient.send({ cmd: 'health-check' }, {}).pipe(timeout(3000)),
      );
      return { status: 'User service connected', response };
    } catch (error) {
      return {
        status: 'User service connection failed',
        error: error.message,
      };
    }
  }
}
