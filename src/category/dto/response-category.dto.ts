import { Expose, Type } from 'class-transformer';
import { Category } from '../entities/category.entity';

export class ResponseCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  slug: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => ResponseCategoryDto)
  children: Category[];
}
