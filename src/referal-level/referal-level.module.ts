import { Module } from '@nestjs/common';
import { ReferalLevelController } from './referal-level.controller';
import { ReferalLevelService } from './referal-level.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ReferalLevelController],
  providers: [ReferalLevelService],
  imports:[PrismaModule,AuthModule]
})
export class ReferalLevelModule {}
