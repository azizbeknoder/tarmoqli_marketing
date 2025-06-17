import { Module } from '@nestjs/common';
import { ProductHistoryController } from './product-history.controller';
import { ProductHistoryService } from './product-history.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductHistoryController],
  providers: [ProductHistoryService],
  imports:[PrismaModule,AuthModule]
})
export class ProductHistoryModule {}
