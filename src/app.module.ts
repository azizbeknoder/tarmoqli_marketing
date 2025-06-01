import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';


import { ReferalModule } from './referal/referal.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import {  TariffModule } from './tariff/tariff.module';
import { UploadModule } from './upload/upload.module';
import { OrdersModule } from './orders/orders.module';
import { CardModule } from './card/card.module';
import { AdminModule } from './admin/admin.module';
import { NotificationGateway } from './gateway/notification.geteway';
import { ProductModule } from './product/product.module';
import { StatistikaModule } from './statistika/statistika.module';
import { NotificationModule } from './notification/notification.module';
import { GatewayModule } from './gateway/gateway.module';

import { PaymentGateway } from './payments/payments.gateway';
import { EmailQueueModule } from './email-queue/email-queue.module';
import { PaymentsModule } from './payments/payments.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckerService } from './task/checker.service';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [AuthorizationModule, PrismaModule, MailModule, ReferalModule, UsersModule, ConfigModule.forRoot({ isGlobal: true }), TariffModule, UploadModule, OrdersModule, CardModule, AdminModule, ProductModule, StatistikaModule, NotificationModule, GatewayModule, EmailQueueModule ,PaymentsModule ,ScheduleModule.forRoot(), CoinModule],
  controllers: [AppController],
  providers: [AppService, MailService, NotificationGateway,CheckerService],
  exports:[NotificationGateway]
})
export class AppModule {}

