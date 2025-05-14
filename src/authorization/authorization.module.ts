import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/token/token.module';
import { ReferalModule } from 'src/referal/referal.module';
import { ReferalService } from 'src/referal/referal.service';

@Module({
  imports: [PrismaModule,MailModule,TokenModule,ReferalModule],
  providers: [AuthorizationService,ReferalService],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}

