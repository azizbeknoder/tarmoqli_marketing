import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentService } from './payments.service';
import { NotificationGateway } from 'src/gateway/notification.geteway';
import { PaymentGateway } from './payments.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentService,NotificationGateway,PaymentGateway],
  exports:[PaymentGateway],
  imports:[PrismaModule]
})
export class PaymentsModule {}
