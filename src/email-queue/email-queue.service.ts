import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailQueueService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async sendEmail(to: string, subject: string, html: string) {
    await this.emailQueue.add('sendEmail', {
      to,
      subject,
      html,
    });
  }

  async sendBulk(emails: string[], subject: string, html: string) {
    for (const email of emails) {
      await this.sendEmail(email, subject, html);
    }
  }
}
