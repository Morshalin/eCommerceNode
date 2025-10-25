import { Expose } from 'class-transformer';
import { IsNotEmpty, Length, length } from 'class-validator';

export class ResponseRoleDto {
  @Expose()
  name: string;

  @Expose()
  description: string;
}
