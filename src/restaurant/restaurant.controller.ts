import { Controller, Get, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('all')
  async getAll(): Promise<any> {
    return this.restaurantService.getAll();
  }
}
