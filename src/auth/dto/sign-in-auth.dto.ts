import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SignInAuthDto {
  @ApiProperty({ default: 'morshalin@gmail.com' })
  email: string;

  @ApiProperty({ default: '123456' })
  password: string;
}
