import { Expose, Type } from 'class-transformer';

export class ResponseProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  price: number;

  @Expose()
  offerPrice: number;

  @Expose()
  quantity: number;

  @Expose()
  shortDescription: string;

  @Expose()
  longDescription: string;

  @Expose()
  isAvailable: boolean;

  @Expose()
  categoryId: number;

  @Expose()
  @Type(() => ResponseProductDto)
  category: any;
}
