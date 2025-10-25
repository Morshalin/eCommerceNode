import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/_utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpAuthDto: SignUpAuthDto) {
    const user = await this.userService.create(signUpAuthDto);

    return generateToken(user, this.jwtService);
  }

  async signIn(signInAuthDto: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInAuthDto.email);

    if (!user) {
      throw new BadRequestException('User not for this email');
    }

    const isMatch = await bcrypt.compare(signInAuthDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Bad Credentials');
    }

    return generateToken(user, this.jwtService);
  }
}
