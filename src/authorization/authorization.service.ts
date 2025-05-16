import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDtoLogin, AuthDtoRegister } from './dto/auth.dot.ts/auth.dto';
import CustomError from 'src/utils/custom-error';
import { MailService } from 'src/mail/mail.service';
import { ReferalService } from 'src/referal/referal.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private authService: AuthService, // Jwt ishlovchi service
    private referal: ReferalService
  ) {}

  async register(body: AuthDtoRegister) {
    const { name, email, password } = body;
    const oldUser = await this.prisma.users.findFirst({ where: { email } });

    if (oldUser) {
      throw new CustomError(402, "Bu foydalanuvchi avval ro'yhatdan o'tgan");
    }

    const mailToken = await this.authService.createMailToken(body);
    await this.mailService.sendMail(email, mailToken);

    return { message: 'success' };
  }

  async verify(token: string) {
    // Token orqali foydalanuvchi tekshiriladi
    const user = await this.authService.verifyMailToken(token);
    const { name, email, password, referal }: AuthDtoRegister = user;
  
    // Email orqali mavjud foydalanuvchini qidirish
    const oldUser = await this.prisma.users.findFirst({ where: { email } });
    if (oldUser) {
      throw new CustomError(403, 'Sizning emailingiz allaqachon tasdiqlangan');
    }
  
    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Yangi foydalanuvchi yaratish
    const createdUser = await this.prisma.users.create({
      data: { name, email, password: hashedPassword },
    });
  
    // Referalni qidirish
    const referalUser = await this.prisma.referral.findFirst({
      where: { referal_token: referal || '' },
    });
    
  
    // Agar referal foydalanuvchisi topilmasa, uni null deb belgilash
    const referalUserId = referalUser ? referalUser.id : null;
  
    // Yangi referal token yaratish
    const createReferalToken = await this.referal.createReferal(email);
  
    // Yangi referal yaratish
    await this.prisma.referral.create({
      data: {
        referal_token: createReferalToken,
        referal_user_id: referalUserId, // Agar referal foydalanuvchisi bo'lsa, ularning ID-si qo'llaniladi
        user_id: createdUser.id, // Yangi foydalanuvchining user_id-si qo'shiladi
      },
    });
  
    return {data:createdUser,message:'success'};
  }
  
  

  async login(body: AuthDtoLogin) {
    const { email, password } = body;
    const user = await this.prisma.users.findFirst({ where: { email } });

    if (!user) {
      throw new CustomError(404, "Ro'yhatdan o'ting!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError(400, 'Email yoki parol xato!');
    }

    const token = await this.authService.createAccessToken({ email });

    return { token,message:'success' };
  }
}