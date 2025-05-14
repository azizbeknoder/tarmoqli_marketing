import { Module } from '@nestjs/common';
import { ReferalService } from './referal.service';

@Module({
  providers: [ReferalService]
})
export class ReferalModule {}
