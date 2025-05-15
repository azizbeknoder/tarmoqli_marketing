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
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { OrdersModule } from './orders/orders.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [AuthorizationModule, PrismaModule, MailModule, ReferalModule, UsersModule, ConfigModule.forRoot({ isGlobal: true }), ProductModule, UploadModule, OrdersModule, CardModule,  ],
  controllers: [AppController],
  providers: [AppService, MailService, ],
})
export class AppModule {}
