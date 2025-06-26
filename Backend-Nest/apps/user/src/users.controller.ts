// users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // HTTP Endpoints
  @Post()
  async createUserHttp(@Body() userData: Partial<User>) {
    try {
      return await this.usersService.create(userData);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':email')
  async findByEmailHttp(@Param('email') email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        return { message: 'User not found' };
      }
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get()
  async getAllUsersHttp() {
    return await this.usersService.findAll();
  }

  @Put(':id')
  async updateUserHttp(
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
  ) {
    return await this.usersService.update(id, updateData);
  }

  @Delete(':id')
  async deleteUserHttp(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

  @Put('password/:email')
  async updatePasswordHttp(
    @Param('email') email: string,
    @Body() body: { newPassword: string },
  ) {
    return await this.usersService.updatePassword(email, body.newPassword);
  }

  // TCP Microservice Endpoints
  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Payload() userData: Partial<User>) {
    try {
      return await this.usersService.create(userData);
    } catch (error) {
      return { error: error.message };
    }
  }

  @MessagePattern({ cmd: 'find-user-by-email' })
  async findByEmail(@Payload() email: string) {
    try {
      console.log('Received email lookup request for:', email);
      const user = await this.usersService.findByEmail(email);
      console.log('Returning user:', user);
      return user;
    } catch (error) {
      console.error('Error in find-user-by-email:', error);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'update-user' })
  async updateUser(@Payload() data: { id: string; updateData: Partial<User> }) {
    return await this.usersService.update(data.id, data.updateData);
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(@Payload() id: string) {
    return await this.usersService.delete(id);
  }

  @MessagePattern({ cmd: 'update-user-password' })
  async updatePassword(
    @Payload() data: { email: string; newPassword: string },
  ) {
    return await this.usersService.updatePassword(data.email, data.newPassword);
  }

  @MessagePattern({ cmd: 'health-check' })
  async healthCheck() {
    return { status: 'healthy', db: 'connected' };
  }
}