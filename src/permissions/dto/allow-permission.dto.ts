import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AllowPermissionDto {
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @IsNotEmpty()
  @IsNumber()
  endpointId: number;

  @IsNotEmpty()
  @IsBoolean()
  isAllow: boolean;
}
