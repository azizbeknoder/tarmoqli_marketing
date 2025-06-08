import { Module } from '@nestjs/common';
import { OrdersProductController } from './orders-product.controller';
import { OrdersProductService } from './orders-product.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OrdersProductController],
  providers: [OrdersProductService],
  imports:[PrismaModule]
})
export class OrdersProductModule {}
