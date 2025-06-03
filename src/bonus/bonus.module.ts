import { Module } from '@nestjs/common';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BonusController],
  providers: [BonusService],
  imports:[PrismaModule,AuthModule]
})
export class BonusModule {}
