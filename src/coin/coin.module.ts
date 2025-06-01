import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CoinService],
  controllers: [CoinController],
  imports:[PrismaModule,AuthModule]
})
export class CoinModule {}
