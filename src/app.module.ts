import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    RestaurantModule,
    OrderModule,
  ],
  controllers: [AppController, RestaurantController],
  providers: [AppService, RestaurantService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
