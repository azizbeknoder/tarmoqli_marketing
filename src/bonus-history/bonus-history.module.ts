import { Module } from '@nestjs/common';
import { BonusHistoryController } from './bonus-history.controller';
import { BonusHistoryService } from './bonus-history.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BonusHistoryController],
  providers: [BonusHistoryService],
  imports:[PrismaModule,AuthModule]
})
export class BonusHistoryModule {}
