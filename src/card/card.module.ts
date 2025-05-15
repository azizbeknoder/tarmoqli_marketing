import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CardService],
  controllers: [CardController],
  imports: [PrismaModule]
})
export class CardModule {}
