import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AllowPermissionDto } from './dto/allow-permission.dto';
import { API_VERSION } from 'src/_cores/constants/app.constant';

@Controller(`${API_VERSION}/permissions`)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
  @Post()
  async allow(@Body() allowPermissionDto: AllowPermissionDto) {
    return this.permissionsService.allow(allowPermissionDto);
  }
}
