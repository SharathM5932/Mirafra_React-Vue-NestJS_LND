import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly jwtService: JwtService, // Inject JwtService
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy) {
    }

    @Post("register")
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post("login")
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Post("forgot-password")
    async forgotPassword(@Body('email') email: string) {
        return this.authService.sendResetLink({ email })
    }
    @Post('reset-password')
    async resetPassword(@Body() { token, password }: { token: string, password: string }) {
        return this.authService.resetPassword(token, password);
    }


}
