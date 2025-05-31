import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from 'src/common/types/auth.types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: UserFromJwt) {
    const user = await this.userService.findById(payload.id);
    if (!user || user.status !== 1) {
      throw new UnauthorizedException('User inactive or deleted');
    }

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      country: payload.country,
    };
  }
}
