import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { RpcException } from '@nestjs/microservices';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'create-category' })
  async handleCreateCategory(data: { name: string }) {
    try {
      return this.categoryService.createIfNotExists(data.name);
    } catch (error) {
      console.error('Error in Category microservice:', error);
      throw new RpcException('Failed to create category');
    }
  }

  @MessagePattern({ cmd: 'get_category_by_name' })
  async handleGetCategoryByName(name: string) {
    try {
      return this.categoryService.findByName(name);
    } catch (error) {
      console.error('Error fetching category by name:', error);
      throw new RpcException('Failed to fetch category');
    }
  }
}
