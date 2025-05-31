import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CheckoutOrderDto } from './dto/checkoutOrder.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { UpdatePaymentDto } from './dto/updateOrder.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Req() req: Request, @Body() dto: CreateOrderDto) {
    const user = req.user as any;
    return this.orderService.createOrder(user.id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Patch(':id/checkout')
  async checkout(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: CheckoutOrderDto,
  ) {
    const user = req.user as any;
    return this.orderService.checkoutOrder(user.id, id, data.paymentMethodId);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/update-payment')
  async updatePayment(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
  ) {
    const user = req.user as any;
    return this.orderService.updatePaymentMethod(
      user.id,
      id,
      dto.paymentMethodId,
    );
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Patch(':id/cancel')
  async cancel(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as any;
    return this.orderService.cancelOrder(user.id, id);
  }

  @Get()
  getAll(@Req() req: Request) {
    const user = req.user as any;
    return this.orderService.getOrders(user.id);
  }
}
