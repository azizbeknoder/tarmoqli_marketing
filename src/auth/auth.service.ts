// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDtoRegister } from 'src/authorization/dto/auth.dot.ts/auth.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  // Email tasdiqlash tokenini yaratish
  async createMailToken(payload: AuthDtoRegister): Promise<string> {
    const user = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      referal: payload.referal || null,
    };

    try {
      return await this.jwtService.signAsync(user, {
        secret: this.configService.get<string>('MAIL_SECRET'), // .env faylidan olish
        expiresIn: this.configService.get<string>('MAIL_TOKEN_EXPIRES_IN') || '10m', // default expiry 10m
      });
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  // Email tokenini tekshirish
  async verifyMailToken(token: string): Promise<AuthDtoRegister> {
    try {
      return await this.jwtService.verifyAsync<AuthDtoRegister>(token, {
        secret: this.configService.get<string>('MAIL_SECRET'), // .env faylidan olish
      });
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  // Kirish (access) tokenini yaratish
  async createAccessToken(payload: { email: string }): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_SECRET'), // .env faylidan olish
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN') || '48h', // default expiry 48h
      });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  // Kirish tokenini tekshirish
  async verifyAccessToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_SECRET'),
      });
    } catch (error) {
      return false
    }
  }
  
}

