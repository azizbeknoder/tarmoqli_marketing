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
    // 1. Token orqali foydalanuvchi ma'lumotlarini yechib olamiz
    const user = await this.authService.verifyMailToken(token);
    const { name, email, password, referal }: AuthDtoRegister = user;
  
    // 2. Email orqali mavjud foydalanuvchini tekshiramiz
    const oldUser = await this.prisma.users.findFirst({ where: { email } });
    if (oldUser) {
      throw new CustomError(403, 'Sizning emailingiz allaqachon tasdiqlangan');
    }
  
    // 3. Parolni hash qilamiz
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // 4. Foydalanuvchini yaratamiz
    const createdUser = await this.prisma.users.create({
      data: { name, email, password: hashedPassword },
    });
  
    // 5. Agar referal ID mavjud bo‘lsa, uni tekshiramiz
    let referal_user_id: number | null = null;
  
    if (referal) {
      const referalExists = await this.prisma.users.findUnique({
        where: { id: Number(referal) },
      });
  
      if (referalExists) {
        referal_user_id = referalExists.id;
      }
    }
  
    // 6. Yangi user uchun referral yozuvi yaratamiz
    await this.prisma.referral.create({
      data: {
        user_id: createdUser.id,
        referal_user_id: referal_user_id, // null bo‘lishi ham mumkin
        referals: [],
      },
    });
  
    // 7. Agar taklif qilgan foydalanuvchi bo‘lsa — uni referral yozuviga bu userni qo‘shamiz
    if (referal_user_id) {
      const referalRecord = await this.prisma.referral.findFirst({
        where: { user_id: referal_user_id },
      });
  
      if (referalRecord) {
        const existingReferals = (referalRecord.referals as number[] | null) ?? [];
        existingReferals.push(createdUser.id);
  
        await this.prisma.referral.update({
          where: { id: referalRecord.id },
          data: {
            referals: existingReferals,
          },
        });
      }
    }
  
    return { data: createdUser, message: 'success' };
  }
  
  
  

  async login(body: AuthDtoLogin) {
    const { email, password } = body;
    const user = await this.prisma.users.findFirst({ where: { email } });

    if (!user) {
      throw new CustomError(404, "Ro'yhatdan o'ting!");
    }

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      throw new CustomError(400, 'Email yoki parol xato!');
    }

    const token = await this.authService.createAccessToken({ email });

    return { token,message:'success',data:{user} };
  }
  async authorizationUserGet(email){
    const data = await this.prisma.users.findFirst({where:{email:email}})
    return data
  }
}