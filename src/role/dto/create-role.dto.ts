import { IsNotEmpty, Length, length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @IsNotEmpty()
  @Length(2, 500)
  description: string;
}
