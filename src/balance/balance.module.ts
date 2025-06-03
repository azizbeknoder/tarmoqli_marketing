import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports:[PrismaModule,AuthModule]
})
export class BalanceModule {}
