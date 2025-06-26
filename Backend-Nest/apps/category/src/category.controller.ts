import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RpcException } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Roles } from '@app/common/decorators/roles.decorator';
import { Role } from '@app/common/constants/roles.constants';
import { RolesGuard } from '@app/common/guards/roles.guard';

@Controller('categories')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  // HTTP Endpoints
  @Post()
  @Roles(Role.ADMIN)
  async createHttp(@Body() createDto: CreateCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.GUEST)
  async findAllHttp() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.GUEST)
  async findByIdHttp(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Get('name/:name')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.GUEST)
  async findByNameHttp(@Param('name') name: string) {
    const category = await this.categoryService.findByName(name);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return {
      message: 'Category retrieved successfully',
      category,
    };
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async updateHttp(
    @Param('id') id: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteHttp(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }

  // TCP Message Handlers
  @MessagePattern({ cmd: 'create-category' })
  @Roles(Role.ADMIN)
  async create(@Payload() createDto: CreateCategoryDto) {
    try {
      this.logger.log(`Creating category via TCP: ${createDto.name}`);
      return await this.categoryService.create(createDto);
    } catch (error) {
      this.logger.error(`TCP Category creation failed: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'create-category-by-name' })
  @Roles(Role.ADMIN)
  async createByName(@Payload() name: string) {
    try {
      this.logger.log(`Creating category by name via TCP: ${name}`);
      return await this.categoryService.createByName(name);
    } catch (error) {
      this.logger.error(
        `TCP Category creation by name failed: ${error.message}`,
      );
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find-category-by-name' })
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.GUEST)
  async findByName(@Payload() name: string) {
    try {
      this.logger.log(`Finding category by name via TCP: ${name}`);
      const category = await this.categoryService.findByName(name);
      return category; // Returns null if not found
    } catch (error) {
      this.logger.error(`TCP Category find by name failed: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'update-category' })
  @Roles(Role.ADMIN)
  async update(
    @Payload() payload: { id: string; updateDto: UpdateCategoryDto },
  ) {
    try {
      return await this.categoryService.update(payload.id, payload.updateDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find-all-categories' })
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.GUEST)
  async findAll() {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find-category-by-id' })
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.GUEST)
  async findById(@Payload() id: string) {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'delete-category' })
  @Roles(Role.ADMIN)
  async delete(@Payload() id: string) {
    try {
      return await this.categoryService.delete(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
