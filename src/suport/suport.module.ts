import { Module } from '@nestjs/common';
import { SuportController } from './suport.controller';
import { SuportService } from './suport.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SuportController],
  providers: [SuportService],
  imports:[PrismaModule,AuthModule]
})
export class SuportModule {}
