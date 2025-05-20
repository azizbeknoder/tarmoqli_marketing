import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import {  TariffController } from './tariff.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TariffService],
  controllers: [TariffController],
  imports: [ PrismaModule,UploadModule,AuthModule],
})
export class TariffModule {}
