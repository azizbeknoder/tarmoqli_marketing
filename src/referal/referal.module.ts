import { Module } from '@nestjs/common';
import { ReferalService } from './referal.service';
import { ReferalController } from './referal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ReferalService],
  controllers: [ReferalController],
  imports:[PrismaModule,AuthModule]
})
export class ReferalModule {}
