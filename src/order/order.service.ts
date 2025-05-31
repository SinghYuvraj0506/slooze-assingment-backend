import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, data: CreateOrderDto) {
    if (!data.items || data.items.length === 0) {
      throw new BadRequestException('Order must contain items');
    }

    // Calculate total
    const itemIds = data.items.map((i) => i.menuItemId);
    const menuItems = await this.prisma.menuItem.findMany({
      where: { id: { in: itemIds } },
    });

    if (menuItems?.length !== itemIds.length) {
      throw new NotFoundException('One or more items not found');
    }

    let total = 0;
    const orderItems = data.items.map((item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId);
      if (!menuItem) throw new BadRequestException('Invalid menu item');
      const itemTotal = menuItem.price * item.quantity;
      total += itemTotal;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      };
    });

    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  }

  async checkoutOrder(
    userId: string,
    orderId: string,
    paymentMethodId: string,
  ) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'PENDING')
      throw new BadRequestException('Order already processed');

    const paymentMethod = await this.prisma.paymentMethod.findFirst({
      where: {
        id: paymentMethodId,
        userId,
      },
    });

    if (!paymentMethod) throw new NotFoundException('Invalid payment method');

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentMethodId,
        status: OrderStatus.READY_TO_PAY,
      },
    });
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (
      order.status === OrderStatus.PAID ||
      order.status === OrderStatus.CANCELLED
    )
      throw new BadRequestException('Order cannot be canceled');

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CANCELLED },
    });
  }

  getOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
        paymentMethod: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updatePaymentMethod(
    userId: string,
    orderId: string,
    paymentMethodId: string,
  ) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (
      order.status === OrderStatus.PAID ||
      order.status === OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(
        'Cannot update payment for processed order',
      );
    }

    const paymentMethod = await this.prisma.paymentMethod.findFirst({
      where: {
        id: paymentMethodId,
        userId,
      },
    });

    if (!paymentMethod) {
      throw new NotFoundException('Invalid payment method');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentMethodId,
      },
    });
  }
}
