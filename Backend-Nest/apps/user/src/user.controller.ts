import { Controller, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // ---------- HTTP ENDPOINTS ----------
  @Get('email/:emailid')
  async findByEmail(@Param('emailid') emailid: string) {
    return this.userService.findByEmail(emailid);
  }
  @Get('/getAll')
  async findAll(): Promise<User[]> {
    return this.userService.findall();
  }

  @Post()
  async create(@Body() data: Partial<User>): Promise<User> {
    return this.userService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Partial<User>): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }

  // ---------- TCP MESSAGE HANDLERS ----------
  @MessagePattern({ cmd: 'find-by-email' })
  async handleFindByEmail(@Payload() emailid: string): Promise<User | null> {
    return this.userService.findByEmail(emailid);
  }
  @MessagePattern({ cmd: 'find-all' })
  async handleFindAll(): Promise<User[]> {
    return this.userService.findall();
  }

  @MessagePattern({ cmd: 'account-create' })
  async handleAccountCreate(@Payload() data: Partial<User>): Promise<User> {
    return this.userService.create(data);
  }
  @MessagePattern({ cmd: 'update-password' })
  async handleUpdatePassword(data: { emailid: string; pwd: string }) {
    return this.userService.updatePasswordByEmail(data.emailid, data.pwd);
  }
}
