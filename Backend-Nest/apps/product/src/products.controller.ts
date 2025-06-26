import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @MessagePattern({ cmd: 'update-category-in-products' })
  async handleCategoryUpdate(
    @Payload() payload: { oldName: string; newName: string },
  ) {
    try {
      await this.productsService.handleCategoryUpdate(
        payload.oldName,
        payload.newName,
      );
      return { success: true };
    } catch (error) {
      this.logger.error(
        `Failed to update category in products: ${error.message}`,
      );
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'remove-category-from-products' })
  async handleCategoryDeletion(@Payload() categoryId: string) {
    try {
      await this.productsService.handleCategoryDeletion(categoryId);
      return { success: true };
    } catch (error) {
      this.logger.error(
        `Failed to remove category from products: ${error.message}`,
      );
      throw new RpcException(error.message);
    }
  }
}
