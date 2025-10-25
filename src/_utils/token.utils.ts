import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

export const generateToken = (user: User, jwtService: JwtService) => {
  const payload = {
    id: user.id,
    firstName: user.lastName,
    lastName: user.firstName,
    userName: user.userName,
    email: user.email,
    isActive: user.isActive,
  };

  return jwtService.signAsync(payload);
};
