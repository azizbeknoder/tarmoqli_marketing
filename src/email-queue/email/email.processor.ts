import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';

@Processor('email')
export class EmailProcessor {
  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    const { to, subject, html } = job.data;
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 587,
        secure: true, // true = 465 port, false = 587 port
        auth: {
          user:  process.env.EMAIL_USER,
          pass:  process.env.EMAIL_PASS, // pochtangizdagi "application password"
        },
      });
      

    await transporter.sendMail({
      to,
      from:  process.env.EMAIL_USER,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
  }
}
