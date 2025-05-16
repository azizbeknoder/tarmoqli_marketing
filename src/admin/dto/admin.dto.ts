// src/admin/dto/admin.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class AdminCreateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'Role faqat USER, ADMIN yoki SUPERADMIN bo‘lishi mumkin',
  })
  role?: Role;
}
