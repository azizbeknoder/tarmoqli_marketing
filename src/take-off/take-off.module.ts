import { Module } from '@nestjs/common';
import { TakeOffController } from './take-off.controller';
import { TakeOffService } from './take-off.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TakeOffController],
  providers: [TakeOffService],
  imports:[PrismaModule]
})
export class TakeOffModule {}
