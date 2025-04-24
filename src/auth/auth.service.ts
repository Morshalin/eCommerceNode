import { BadRequestException, Injectable } from '@nestjs/common';
import { signUpAuthDto } from './dto/sign-up-auth.dto';
import { signInAuthDto } from './dto/sign-in-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpAuthDto: signUpAuthDto) {
    const user = await this.userService.create(signUpAuthDto);

    return generateToken(user, this.jwtService);
  }

  async signIn(signInAuthDto: signInAuthDto) {
    const user = await this.userService.findByEmail(signInAuthDto.email);
    console.log(user);

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
