import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { timeout } from 'rxjs/operators';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: registerDto) {
    const { username, email, password } = registerDto;

    try {
      // Check if user exists
      const existingUser = await firstValueFrom(
        this.userClient
          .send({ cmd: 'find-user-by-email' }, email)
          .pipe(timeout(5000)),
      );

      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with proper error handling
      const user = await firstValueFrom(
        this.userClient
          .send(
            { cmd: 'create-user' },
            {
              username,
              email,
              password: hashedPassword,
              role: 'customer',
            },
          )
          .pipe(timeout(5000)),
      );

      if (!user) {
        throw new Error('User creation failed - no user returned');
      }

      console.log('Registered user:', user); // Log the created user

      const token = this.jwtService.sign({
        email: user.email,
        role: user.role,
      });

      return {
        message: 'User registered successfully',
        user: {
          username: user.username,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(loginDto: loginDto) {
    const { email, password } = loginDto;

    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'find-user-by-email' }, email),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  // async sendResetLink(forgotPasswordDto: ForgotPasswordDto) {
  //   const { email } = forgotPasswordDto;
  //   console.log('Attempting to send reset link to:', email);

  //   try {
  //     const user = await firstValueFrom(
  //       this.userClient
  //         .send({ cmd: 'find-user-by-email' }, email)
  //         .pipe(timeout(5000)),
  //     );

  //     console.log('User lookup result:', user);

  //     if (!user) {
  //       console.log(`No user found for email: ${email}`);
  //       // Security: return generic message
  //       return { message: 'If an account exists, a reset link has been sent' };
  //     }

  //     // Generate reset token with expiration (1 hour)
  //     const resetToken = this.jwtService.sign(
  //       { email: user.email },
  //       { expiresIn: '1h' },
  //     );

  //     // Create reset link
  //     const resetLink = `${this.configService.get('RESET_LINK')}:${this.configService.get('RESET_LINK_PORT')}/reset-password?token=${resetToken}`;

  //     // Send email
  //     await this.mailerService.sendMail({
  //       to: user.email,
  //       subject: 'Password Reset Request',
  //       template: 'reset-password',
  //       context: {
  //         name: user.username,
  //         resetLink: resetLink,
  //       },
  //     });

  //     return {
  //       message: 'If an account exists, a reset link has been sent',
  //       resetToken, // For testing purposes only, remove in production
  //     };
  //   } catch (error) {
  //     console.error('Error in sendResetLink:', error);
  //     return { message: 'If an account exists, a reset link has been sent' };
  //   }
  // }
  async sendResetLink(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    console.log('Attempting to send reset link to:', email);

    try {
      const user = await firstValueFrom(
        this.userClient
          .send({ cmd: 'find-user-by-email' }, email)
          .pipe(timeout(5000)),
      );

      console.log('User lookup result:', user);

      if (!user) {
        console.log(`No user found for email: ${email}`);
        return { message: 'If an account exists, a reset link has been sent' };
      }

      // Generate reset token with expiration (1 hour)
      const resetToken = this.jwtService.sign(
        { email: user.email },
        { expiresIn: '1h' },
      );

      // Create reset link
      const resetLink = `${this.configService.get('RESET_LINK')}:${this.configService.get('RESET_LINK_PORT')}/reset-password?token=${resetToken}`;

      // Direct HTML email content
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello ${user.username},</p>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${resetLink}" 
            style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        
        <p style="margin-top: 30px; color: #777; font-size: 12px;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          ${resetLink}
        </p>
      </div>
    `;

      // Send email
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password Reset Request',
        html: htmlContent,
      });

      return {
        message: 'If an account exists, a reset link has been sent',
        resetToken, // For testing purposes only, remove in production
      };
    } catch (error) {
      console.error('Error in sendResetLink:', error);
      return { message: 'If an account exists, a reset link has been sent' };
    }
  }

  async verifyResetToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      if (!payload?.email) {
        throw new UnauthorizedException('Invalid token: missing email');
      }

      const user = await firstValueFrom(
        this.userClient
          .send({ cmd: 'find-user-by-email' }, payload.email)
          .pipe(timeout(5000)),
      );

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  async resetPassword(token: string, newPassword: string) {
    const payload = await this.verifyResetToken(token);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await firstValueFrom(
      this.userClient.send(
        { cmd: 'update-user-password' },
        { email: payload.email, newPassword: hashedPassword },
      ),
    );

    if (!updatedUser) {
      throw new NotFoundException('Password update failed');
    }

    return { message: 'Password updated successfully' };
  }
}
