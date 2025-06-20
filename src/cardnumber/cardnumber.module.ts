import { Module } from '@nestjs/common';
import { CardnumberController } from './cardnumber.controller';
import { CardnumberService } from './cardnumber.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardnumberController],
  providers: [CardnumberService],
  imports:[PrismaModule,AuthModule]
})
export class CardnumberModule {}
