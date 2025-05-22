import { Module } from '@nestjs/common';
import { ReferalService } from './referal.service';
import { ReferalController } from './referal.controller';

@Module({
  providers: [ReferalService],
  controllers: [ReferalController]
})
export class ReferalModule {}
