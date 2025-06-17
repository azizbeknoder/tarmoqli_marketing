import { Module } from '@nestjs/common';
import { TariffHistoryService } from './tariff-history.service';
import { TariffHistoryController } from './tariff-history.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TariffHistoryService],
  controllers: [TariffHistoryController],
  imports:[PrismaModule,AuthModule]
})
export class TariffHistoryModule {}
