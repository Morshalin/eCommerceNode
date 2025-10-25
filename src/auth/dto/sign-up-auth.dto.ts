import { ApiProperty } from '@nestjs/swagger';

export class SignUpAuthDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  role: string;
}
