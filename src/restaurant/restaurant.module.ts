import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [PrismaModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
