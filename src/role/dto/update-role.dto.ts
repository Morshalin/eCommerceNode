import { IsNotEmpty, Length, length } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty()
  @Length(2, 500)
  description: string;
}
