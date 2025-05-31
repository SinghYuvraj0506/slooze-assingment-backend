import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CreatePaymentMethodDto } from './dto/createPayment.dto';
import { UserService } from './user.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('payment-methods')
  async addPaymentMethod(
    @Req() req: any,
    @Body() data: CreatePaymentMethodDto,
  ) {
    const user = req.user;
    return this.userService.addPaymentMethod(user.id, data);
  }

  @Get('payment-methods')
  getPaymentMethods(@Req() req: any) {
    const user = req.user;
    return this.userService.getUserPaymentMethods(user.id);
  }
}
