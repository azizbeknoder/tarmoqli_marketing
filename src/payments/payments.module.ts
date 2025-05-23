import { Module } from '@nestjs/common';
import { PaymentGateway } from './payments.gateway';

@Module({
  providers: [PaymentGateway],
})
export class PaymentsModule {}
