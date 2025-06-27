import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject('CATEGORY_SERVICE') private categoryClient: ClientProxy
  ) { }

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      // 1. Check if category exists
      const existingCat = await firstValueFrom(
        this.categoryClient.send({ cmd: 'get_category_by_name' }, dto.category),
      );

      // 2. If category doesn't exist, create it
      if (!existingCat) {
        await firstValueFrom(
          this.categoryClient.send({ cmd: 'create-category' }, { name: dto.category }),
        );
      }

      // 3. Save the product
      const newProduct = new this.productModel(dto);
      return newProduct.save();
    } catch (error) {
      console.error('Error during product creation:', error);
      throw error;
    }
  }


  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }


  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }
  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.productModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: 'Product deleted successfully' };
  }
}

