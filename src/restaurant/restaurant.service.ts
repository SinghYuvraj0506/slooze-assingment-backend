import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const data = await this.prisma.restaurant.findMany({
      include: {
        menuItems: {
          select: {
            id: true,
            price: true,
            name: true,
          },
        },
      },
    });

    return data;
  }
}
