import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { ReferalModule } from 'src/referal/referal.module';
import { ReferalService } from 'src/referal/referal.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [PrismaModule,MailModule,ReferalModule,AuthModule],
  providers: [AuthorizationService,ReferalService,GoogleStrategy],
  controllers: [AuthorizationController],
  exports: [AuthorizationService]
})
export class AuthorizationModule {}

