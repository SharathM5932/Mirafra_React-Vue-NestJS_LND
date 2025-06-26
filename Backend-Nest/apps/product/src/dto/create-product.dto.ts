import { IsString, IsNumber, IsNotEmpty,IsMongoId, IsObject } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string; // Changed from IsMongoId to IsString

  @IsString()
  @IsNotEmpty()
  image: string;
}