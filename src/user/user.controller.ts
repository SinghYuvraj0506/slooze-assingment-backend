import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from './dto/createPayment.dto';
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

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch('payment-methods/:id')
  async updatePaymentMethod(
    @Req() req: any,
    @Param('id') id: string,
    @Body() data: UpdatePaymentMethodDto,
  ) {
    const user = req.user;
    return this.userService.updatePaymentMethod(user.id, id, data);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get('payment-methods')
  getPaymentMethods(@Req() req: any) {
    const user = req.user;
    return this.userService.getUserPaymentMethods(user.id);
  }
}
