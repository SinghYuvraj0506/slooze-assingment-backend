import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { UserFromJwt } from 'src/common/types/auth.types';
import { Response } from 'express';
import { cookieOptions } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { access_token, user } = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie('access_token', access_token, cookieOptions as any);

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request & { user: UserFromJwt }) {
    return this.authService.getUser(req.user.id);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', cookieOptions as any);

    return { success: true };
  }
}
