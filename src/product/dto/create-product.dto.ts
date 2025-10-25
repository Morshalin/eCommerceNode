import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  maxLength,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  offerPrice: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(1000)
  longDescription: string;

  @IsInt()
  categoryId: number;
}
