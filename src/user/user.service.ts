import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from './dto/createPayment.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async addPaymentMethod(userId: string, data: CreatePaymentMethodDto) {
    if (data.isDefault) {
      await this.prisma.paymentMethod.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return this.prisma.paymentMethod.create({
      data: {
        userId,
        type: data.type,
        cardLast4: data.cardLast4,
        isDefault: data.isDefault,
      },
    });
  }

  getUserPaymentMethods(userId: string) {
    return this.prisma.paymentMethod.findMany({
      // where: { userId },
      orderBy: { isDefault: 'desc' },
    });
  }

  async updatePaymentMethod(
    userId: string,
    paymentMethodId: string,
    data: UpdatePaymentMethodDto,
  ) {
    const method = await this.prisma.paymentMethod.findFirst({
      where: {
        id: paymentMethodId,
        userId,
      },
    });

    if (!method) {
      throw new NotFoundException('Payment Details not found');
    }

    if (data.isDefault) {
      await this.prisma.paymentMethod.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return this.prisma.paymentMethod.update({
      where: { id: paymentMethodId },
      data: {
        ...data,
      },
    });
  }
}
