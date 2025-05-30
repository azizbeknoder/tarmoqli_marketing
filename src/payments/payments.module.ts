import { Module } from '@nestjs/common';
import { PaymentGateway } from './payments.gateway';

import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentService } from './payments.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PaymentGateway,PaymentService],
  imports: [PrismaModule,AuthModule,],
  exports:[PaymentService]
})
export class PaymentsModule {}
