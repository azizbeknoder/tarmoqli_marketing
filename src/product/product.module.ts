import { Module } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports:[PrismaModule,AuthModule]
})
export class ProductModule {}
