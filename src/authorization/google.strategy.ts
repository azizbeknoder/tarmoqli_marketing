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
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;
    const email = emails?.[0].value;

    let user = await this.prisma.users.findUnique({ where: { googleId: id } });

    if (!user) {
      user = await this.prisma.users.findUnique({ where: { email } });
      if (user) {
        user = await this.prisma.users.update({
          where: { email },
          data: { googleId: id },
        });
      } else {
        user = await this.prisma.users.create({
          data: {
            googleId: id,
            email,
            name: name?.givenName,
          },
        });
      }
    }

    const token = await this.authService.createAccessToken({ email });

    done(null, { user, token });
  }
}
