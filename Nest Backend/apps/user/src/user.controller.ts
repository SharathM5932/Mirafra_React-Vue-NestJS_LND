import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'find-by-email' })
  async findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'create' })
  async create(data: Partial<User>): Promise<User> {
    return this.userService.create(data);
  }

  @MessagePattern({ cmd: 'update-password' })
  async updatePassword(data: { email: string; password: string }) {
    const { email, password } = data;
    return this.userService.updatePassword(email, password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.userService.updateById(id, updateData);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  @Delete()
  deleteAll() {
    return this.userService.deleteAll();
  }
}
