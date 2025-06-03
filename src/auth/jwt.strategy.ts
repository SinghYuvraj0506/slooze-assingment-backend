import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserFromJwt } from 'src/common/types/auth.types';
import { UserService } from 'src/user/user.service';
import { CookieOptions, Request } from 'express';

const cookieExtractor = (req: Request): string | null => {
  return req?.cookies?.access_token || null;
};

export const cookieOptions: CookieOptions =
  process.env.NODE_ENV === 'development'
    ? {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: parseInt(process.env.JWT_EXPIRY as string) * 1000,
      }
    : {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: 'slooze-assignment-frontend.vercel.app',
        path: '/',
        maxAge: parseInt(process.env.JWT_EXPIRY as string) * 1000,
      };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: cookieExtractor,
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
