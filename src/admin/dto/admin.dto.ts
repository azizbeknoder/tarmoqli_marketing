// src/admin/dto/admin.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AdminCreateDto {
  @ApiProperty({example:"John doe",description:"Admin ismi familyasi kiritilishi mumkun"})
  @IsString()
  name: string;

  @ApiProperty({example:"admin@gmail.com",description:"Admin uchun mavjud bo'lmagan email bo'lsa ham bo'laveradi"})
  @IsEmail()
  email: string;

  @ApiProperty({example:"12345678",description:"Minimum uzunligi 8 belgi maximum 22 belgi"})
  @IsString()
  password: string;

  @ApiProperty({example:"SUPERADMIN",description:"role kiritish uchun etirob berish kerak ADMIN YOKI SUPERADMIN barcha harflar kattada bo'lishi kerak"})
  @IsOptional()
  @IsEnum(Role, {message: 'Role faqat USER, ADMIN yoki SUPERADMIN bo‘lishi mumkin'})
  role?: Role;
}
