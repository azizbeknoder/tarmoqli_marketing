import { Module } from '@nestjs/common';
import { PaymentGateway } from './payments.gateway';

import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentService } from './payments.service';
import { AuthModule } from 'src/auth/auth.module';
import { PaymentsController } from './payments.controller';
import { PaymentHTTPService } from './paymentHTTP.service';

@Module({
  providers: [PaymentGateway,PaymentService,PaymentHTTPService],
  imports: [PrismaModule,AuthModule,],
  exports:[PaymentService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
