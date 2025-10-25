import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    try {
      const currentUser = (await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JW_SECRET_KEY'),
      })) as UserPayload;

      request.currentUser = {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        userName: currentUser.userName,
        email: currentUser.email,
      };

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
