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
2
    const subject = 'Emailni tasdiqlang';
    const text = `Quyidagi link orqali emailingizni tasdiqlang: ${link}`;
    const html = `<p>Assalomu alaykum,</p>
                  <p>Emailingizni tasdiqlash uchun quyidagi havolani bosing:</p>
                  <a href="${link}">Emailni tasdiqlash</a>`;

    await this.transporter.sendMail({
      from: `"Tizim" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  }
}
}
