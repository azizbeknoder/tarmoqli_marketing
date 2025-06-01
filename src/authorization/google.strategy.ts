import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private authSerivce:AuthService
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
      passReqToCallback: true, // requestni validate()ga uzatish uchun kerak
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails, photos } = profile;
    const email = emails?.[0].value;

    // DBdan Google ID bo'yicha foydalanuvchini qidiramiz
    let user = await this.prisma.users.findUnique({ where: { googleId: id } });

    if (!user) {
      // Agar foydalanuvchi yo'q bo'lsa, yangi yaratamiz
      user = await this.prisma.users.create({
        data: {
          googleId: id,
          email,
          name: name?.givenName,
        },
      });
    }
    const token = await this.authSerivce.createAccessToken({email})
    
    done(null, {user,token},);
  }
}
