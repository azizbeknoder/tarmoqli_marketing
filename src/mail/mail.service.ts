import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly config:ConfigService){}
  private  transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendMail(to:string,token:string) {{
    const base_url = this.config.get('BASE_URL')
    const link = `${String(base_url)}authorization/verify/${token}`;

    const subject = 'Подтвердите ваш адрес электронной почты';
const text = `Пожалуйста, подтвердите вашу почту, перейдя по ссылке: ${link}`;
const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 40px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 30px;">
      <h2 style="color: #333333; text-align: center;">Здравствуйте!</h2>
      <p style="font-size: 16px; color: #555555; line-height: 1.6;">
        Спасибо за регистрацию. Пожалуйста, подтвердите ваш адрес электронной почты, нажав на кнопку ниже:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="background-color: #4CAF50; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
          Подтвердить Email
        </a>
      </div>
      <p style="font-size: 14px; color: #888888;">
        Если вы не регистрировались у нас, просто проигнорируйте это письмо.
      </p>
      <p style="font-size: 14px; color: #888888;">С уважением, <br/>Команда поддержки</p>
    </div>
  </div>
`;


    await this.transporter.sendMail({
      from: `"Tizim" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  }
 
}
async sendNotificationMail(to:string,subject:string,text:string){
  const data = await this.transporter.sendMail({
    from:`"Tizim" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  })
  return data
}
}
