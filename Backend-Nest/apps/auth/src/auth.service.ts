import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy, private jwtService: JwtService, private readonly configService: ConfigService, private readonly mailerService: MailerService) { }
    //userService is dependency injection for authentication service
    async register(registerDto: RegisterDto) {
        const { emailid, name, phno, pwd } = registerDto;
        const user = await firstValueFrom(
            this.userClient.send({ cmd: "find-by-email" }, emailid)
        );

        if (user) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(pwd, 10);
        const createdUser = await firstValueFrom(
            this.userClient.send(
                { cmd: "account-create" },
                { emailid, name, phno, pwd: hashedPassword }
            )
        );

        return {
            msg: "User created Successfully!",
            id: createdUser.emailid,
            name: createdUser.name
        };
    }



    async login(loginDto: LoginDto) {
        const { emailid, pwd } = loginDto;
        const user = await firstValueFrom(
            this.userClient.send({
                cmd: "find-by-email"
            }, emailid)
        )
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload = { emailid: user?.emailid, role: user.role }
        const token = this.jwtService.sign(payload);
        // return { "msg": "Login Successful", "email": user.emailid, "name": user.name, "token": token };
        return {
            msg: "Login Successful",
            _id: user._id,
            email: user.emailid,
            name: user.name,
            role: user.role,       // role
            token: token
        };
    }

    async validatePayload(payload: any) {
        return {
            emailid: payload.emailid,
            role: payload.role,
        }
    }

    async sendResetLink(forgotPasswordDto: ForgotPasswordDto) {
        const { emailid } = forgotPasswordDto;
        const user = await firstValueFrom(
            this.userClient.send({
                cmd: "find-by-email"
            }, emailid)
        )
        if (!user) {
            throw new NotFoundException("Email id not found")
        }
        const payload = { emailid: user?.emailid }
        const token = this.jwtService.sign(payload);
        // const resetLink = `${this.configService.get<string>('RESET_LINK')} : ${this.configService.get<string>('RESET_LINK_PORT')}/reset-password?token=${token}`
        // const resetLink = `http://${this.configService.get('RESET_LINK')}:${this.configService.get('RESET_LINK_PORT')}/reset-password?token=${token}`;

        await this.mailerService.sendMail({
            to: user.emailid,
            subject: 'Reset your Password',
            html: `<p>here is your token "${token}" to reset your password</p>`
        })
        return {
            msg: "Reset Link send Successfully"
        }
    }
    async resetPassword(token: string, newPassword: string) {
        try {
            const payload: any = this.jwtService.verify(token);

            const user = await firstValueFrom(
                this.userClient.send({ cmd: "find-by-email" }, payload.emailid)
            );

            if (!user) {
                throw new NotFoundException("Invalid token or user no longer exists");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await firstValueFrom(
                this.userClient.send({ cmd: "update-password" }, { emailid: payload.emailid, pwd: hashedPassword })
            );

            return { msg: "Password updated successfully" };
        } catch (err) {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }
}