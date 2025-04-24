import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpAuthDto } from './dto/sign-up-auth.dto';
import { signInAuthDto } from './dto/sign-in-auth.dto';

@Controller('v1/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpAuthDto: signUpAuthDto) {
    const accessToken = await this.authService.signUp(signUpAuthDto);

    return {
      message: 'Sing up success',
      data: accessToken,
    };
  }
  @Post('sign-in')
  async signIn(@Body() signInAuthDto: signInAuthDto) {
    const accessToken = await this.authService.signIn(signInAuthDto);

    return {
      message: 'Sing In success',
      data: accessToken,
    };
  }
}
