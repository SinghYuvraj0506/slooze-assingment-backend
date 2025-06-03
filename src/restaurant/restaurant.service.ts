import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async getAll(user_country?: Country) {
    const data = await this.prisma.restaurant.findMany({
      where: {
        country: user_country,
      },
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
