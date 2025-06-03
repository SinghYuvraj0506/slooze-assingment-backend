import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Invalid email or password');

    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload =
      user.role === Role.ADMIN
        ? {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
          }
        : {
            id: user.id,
            email: user.email,
            role: user.role,
            country: user.country,
            status: user.status,
          };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getUser(id: string) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new BadRequestException('Invalid Request');
    }

    const { password: _, ...result } = user;
    return result;
  }
}
