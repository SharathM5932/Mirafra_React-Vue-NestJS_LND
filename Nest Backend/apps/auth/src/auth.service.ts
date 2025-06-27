import { Injectable, ConflictException, UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';// Import necessary decorators and exceptions from NestJS
import { UserService } from 'apps/user/src/user.service'; // Import UserService to interact with user-related operations (DB actions)
import { RegisterDto } from './dto/register.dto'; // Import the RegisterDto class that defines the structure of register data
import * as bcrypt from 'bcrypt'; // Import bcrypt library to securely hash passwords
import { LoginDto } from './dto/login.dto'; // Import the LoginDto class that defines the structure of login data
import { JwtService } from '@nestjs/jwt'; // Import JwtService to generate JWT tokens during login
import { userDocument } from 'apps/user/src/schemas/user.schema'; // Import the user document schema type (for type checking)
import { ClientProxy, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {

  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy, private jwtService: JwtService, private readonly configService: ConfigService, private readonly mailerService: MailerService) { }

  async register(registerDto: RegisterDto) {
    const { name, email, password, phone, role } = registerDto
    const existingUser = await firstValueFrom(
      this.userClient.send(
        { cmd: 'find-by-email' },
        email
      )
    );
    if (existingUser) {
      throw new ConflictException('Email already registered')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await firstValueFrom(
      this.userClient.send({
        cmd: 'create'
      }, {
        name,
        email,
        password: hashedPassword,
        phone,
        role
      })
    )

    return {
      message: "user regestered successfully",
      user: {
        // id:user._id,
        name: user.name,
        email: user.email
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await firstValueFrom(
      this.userClient.send(
        { cmd: 'find-by-email' }, // fixed
        email
      )
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const isMatch = await bcrypt.compare(password, user!.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Password')
    }

    const payload = {
      email: user?.email,
      role: user?.role,
    }

    const token = this.jwtService.sign(payload)

    return {
      message: "user Login successfully",
      accessToken: token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role 
      }
    }
  }

  async sendResetLink(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto
    const user = await firstValueFrom(
      this.userClient.send(
        { cmd: 'find-by-email' },
        email
      )
    )
    if (!user) {
      throw new NotFoundException("Email id not found")
    }

    const jwtSecret = this.configService.get('JWT_SECRET')
    const payload = { email: user?.email }
    const token = this.jwtService.sign(payload)
    const resetLink = `http://${this.configService.get<string>('RESET_LINK')}:${this.configService.get<string>('RESET_LINK_PORT')}/reset-password?token=${token}`;


    await this.mailerService.sendMail({
      to: user.email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
    });
    return {
      message: "Reset Link send successfully"
    }

  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token); // Decode and verify token
      const email = decoded.email;

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const result = await firstValueFrom(
        this.userClient.send(
          { cmd: 'update-password' },
          { email, password: hashedPassword }
        )
      );

      return {
        message: 'Password updated successfully',
        result
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
