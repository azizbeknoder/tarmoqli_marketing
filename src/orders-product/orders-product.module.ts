import { Module } from '@nestjs/common';
import { OrdersProductController } from './orders-product.controller';
import { OrdersProductService } from './orders-product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersProductController],
  providers: [OrdersProductService],
  imports:[PrismaModule,AuthModule]
})
export class OrdersProductModule {}
