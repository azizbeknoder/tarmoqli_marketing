import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MailModule } from 'src/mail/mail.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
  imports:[MailModule,AuthModule,PrismaModule]
})
export class NotificationModule {}
