import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('/')
  async getAll(@Req() req: Request): Promise<any> {
    const user = req.user as any;
    return this.restaurantService.getAll(user?.country);
  }
}
