import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';

import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';
import { ReferalModule } from './referal/referal.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthorizationModule, PrismaModule, MailModule, TokenModule, ReferalModule, UsersModule, ],
  controllers: [AppController],
  providers: [AppService, MailService, TokenService],
})
export class AppModule {}
