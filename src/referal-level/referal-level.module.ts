import { Module } from '@nestjs/common';
import { ReferalLevelController } from './referal-level.controller';
import { ReferalLevelService } from './referal-level.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ReferalLevelController],
  providers: [ReferalLevelService],
  imports:[PrismaModule]
})
export class ReferalLevelModule {}
