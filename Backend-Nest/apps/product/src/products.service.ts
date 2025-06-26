import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, throwError, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private readonly categoryServiceTimeout = 5000;

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject('CATEGORY_SERVICE') private readonly categoryClient: ClientProxy,
  ) {
    this.initializeConnection();
  }

  private async initializeConnection() {
    try {
      await this.categoryClient.connect();
      this.logger.log('Successfully connected to Category Service');
    } catch (err) {
      this.logger.error('Failed to connect to Category Service:', err.message);
      setTimeout(() => this.initializeConnection(), 5000);
    }
  }

  public async handleCategoryUpdate(
    oldName: string,
    newName: string,
  ): Promise<void> {
    try {
      await this.productModel
        .updateMany({ category: oldName }, { $set: { category: newName } })
        .exec();
      this.logger.log(
        `Updated category name in all products from ${oldName} to ${newName}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to update products for category ${oldName}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to update products with new category name',
      );
    }
  }

  public async handleCategoryDeletion(categoryId: string): Promise<void> {
    try {
      await this.productModel
        .updateMany({ category: categoryId }, { $unset: { category: '' } })
        .exec();
      this.logger.log(
        `Removed category reference from all products for category ${categoryId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to remove category from products ${categoryId}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to remove category from products',
      );
    }
  }

  async create(createProductDto: CreateProductDto): Promise<{
    message: string;
    product: Product;
    categoryMessage?: string;
  }> {
    try {
      let categoryMessage = '';
      let categoryName: string;

      if (!createProductDto.category) {
        throw new BadRequestException('Category is required');
      }

      // Check if the input is a valid category name
      if (typeof createProductDto.category === 'string') {
        // Find or create the category
        const category = await this.resolveCategoryByName(
          createProductDto.category,
        );
        categoryName = category.category.name;
        if (category.message) {
          categoryMessage = category.message;
        }
      } else {
        throw new BadRequestException('Category must be a string name');
      }

      const product = new this.productModel({
        ...createProductDto,
        category: categoryName, // Store the category name directly
      });

      const savedProduct = await product.save();

      return {
        message: `${categoryMessage}Product created successfully`,
        product: savedProduct,
        ...(categoryMessage ? { categoryMessage: 'New category created' } : {}),
      };
    } catch (error) {
      this.logger.error(
        `Failed to create product: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        error.message || 'Failed to create product',
      );
    }
  }

  public async findCategoryById(id: string): Promise<any> {
    try {
      this.logger.log(`Looking for category by ID: ${id}`);
      return await firstValueFrom(
        this.categoryClient.send({ cmd: 'find-category-by-id' }, id).pipe(
          timeout(this.categoryServiceTimeout),
          catchError((error) => {
            this.logger.error(`Category service error: ${error.message}`);
            throw new InternalServerErrorException(
              'Category service unavailable',
            );
          }),
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to find category by ID: ${error.message}`);
      throw error;
    }
  }

  public async resolveCategoryByName(
    name: string,
  ): Promise<{ category: any; message: string }> {
    try {
      this.logger.log(`Resolving category by name: ${name}`);

      // Check if category exists
      let existingCategory;
      try {
        existingCategory = await firstValueFrom(
          this.categoryClient.send({ cmd: 'find-category-by-name' }, name).pipe(
            timeout(this.categoryServiceTimeout),
            catchError((error) => {
              // Handle "not found" as a normal case
              if (error?.message === 'Category not found') {
                return of(null); // Return null to indicate not found
              }
              this.logger.error(`Category find error: ${error?.message}`);
              return throwError(
                () =>
                  new InternalServerErrorException(
                    'Category service unavailable',
                  ),
              );
            }),
          ),
        );
      } catch (error) {
        this.logger.error(
          `Category service communication error: ${error.message}`,
        );
        throw new InternalServerErrorException('Category service unavailable');
      }

      if (existingCategory) {
        this.logger.log(`Found existing category: ${name}`);
        return { category: existingCategory, message: '' };
      }

      // Create new category if it doesn't exist
      this.logger.log(`Creating new category: ${name}`);
      const newCategory = await firstValueFrom(
        this.categoryClient.send({ cmd: 'create-category-by-name' }, name).pipe(
          timeout(this.categoryServiceTimeout),
          catchError((error) => {
            this.logger.error(`Category creation error: ${error?.message}`);
            return throwError(
              () =>
                new InternalServerErrorException('Failed to create category'),
            );
          }),
        ),
      );

      this.logger.log(`Successfully created category: ${name}`);
      return { category: newCategory, message: 'New category created and ' };
    } catch (error) {
      this.logger.error(`Failed to resolve category by name: ${error.message}`);
      throw error;
    }
  }

  public isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  async findAll(): Promise<{ message: string; products: Product[] }> {
    try {
      const products = await this.productModel.find().exec();
      return {
        message:
          products.length > 0
            ? 'Products retrieved successfully'
            : 'No products found',
        products,
      };
    } catch (error) {
      this.logger.error(`Failed to retrieve products: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async findOne(id: string): Promise<{ message: string; product: Product }> {
    try {
      if (!this.isValidObjectId(id)) {
        throw new BadRequestException('Invalid product ID');
      }

      const product = await this.productModel
        .findById(id)
        .populate('category')
        .exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return {
        message: 'Product retrieved successfully',
        product,
      };
    } catch (error) {
      this.logger.error(`Failed to retrieve product ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(
    id: string,
    updateDto: UpdateProductDto,
  ): Promise<{ message: string; product: Product }> {
    try {
      if (!this.isValidObjectId(id)) {
        throw new BadRequestException('Invalid product ID');
      }

      if (updateDto.category) {
        const categoryExists = await this.findCategoryById(updateDto.category);
        if (!categoryExists) {
          throw new NotFoundException('Category not found');
        }
      }

      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateDto, { new: true })
        .populate('category')
        .exec();

      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }

      return {
        message: 'Product updated successfully',
        product: updatedProduct,
      };
    } catch (error) {
      this.logger.error(`Failed to update product ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      if (!this.isValidObjectId(id)) {
        throw new BadRequestException('Invalid product ID');
      }

      const deleted = await this.productModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('Product not found');
      }
      return { message: 'Product deleted successfully' };
    } catch (error) {
      this.logger.error(`Failed to delete product ${id}: ${error.message}`);
      throw error;
    }
  }
}
