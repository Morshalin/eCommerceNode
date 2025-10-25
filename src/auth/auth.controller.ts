import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { API_VERSION } from 'src/_cores/constants/app.constant';

@Controller(`${API_VERSION}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    const accessToken = await this.authService.signUp(signUpAuthDto);

    return {
      message: 'Sing up success',
      data: accessToken,
    };
  }
  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() signInAuthDto: SignInAuthDto) {
    const accessToken = await this.authService.signIn(signInAuthDto);

    return {
      message: 'Sing In success',
      data: accessToken,
    };
  }
}
