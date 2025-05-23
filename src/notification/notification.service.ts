import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { SendNotificationMailDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
    constructor(private readonly mailService:MailService){}
    async sendNotificatinMail(body:SendNotificationMailDto){
        const {email,title,description} = body
        const data = await this.mailService.sendNotificationMail(email,title,description)
        return data
    }
}
