import { Module } from '@nestjs/common';
import { TakeOffController } from './take-off.controller';
import { TakeOffService } from './take-off.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TakeOffController],
  providers: [TakeOffService],
  imports:[PrismaModule,AuthModule]
})
export class TakeOffModule {}
