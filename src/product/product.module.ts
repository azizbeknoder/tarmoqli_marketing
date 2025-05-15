import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [ PrismaModule,UploadModule],
})
export class ProductModule {}
