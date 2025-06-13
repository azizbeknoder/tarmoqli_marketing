import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDecimal, IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateUserEarningDto {
  @ApiProperty({ example: 'USD', description: 'Valyuta kodi' })
  @IsString()
  currency: string;

  @ApiProperty({ example: '150.50', description: 'Summa (decimal string)' })
  @IsString()
  amount: string;
}

export class CreateRecentUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Foydalanuvchi emaili' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: [CreateUserEarningDto], description: 'Foydalanuvchi daromadlari ro‘yxati' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserEarningDto)
  userEarnings: CreateUserEarningDto[];
}

export class CreateStatEarningDto {
  @ApiProperty({ example: 'UZS', description: 'Valyuta kodi' })
  @IsString()
  currency: string;

  @ApiProperty({ example: '2500', description: 'Summa (decimal string)' })
  @IsString()
  amount: string;
}

export class CreateStatsWidgetDto {
  @ApiProperty({ example: 100, description: 'Onlayn foydalanuvchilar soni' })
  @IsNumber()
  onlineUserCount: number;

  @ApiProperty({ example: '2750', description: 'Jami daromad (decimal string)' })
  @IsString()
  totalEarned: string;

  @ApiProperty({ type: [CreateStatEarningDto], description: 'Har bir valyutadagi daromadlar' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStatEarningDto)
  statEarnings: CreateStatEarningDto[];

  @ApiProperty({ type: [CreateRecentUserDto], description: 'So‘nggi foydalanuvchilar va ularning daromadlari' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecentUserDto)
  recentUsers: CreateRecentUserDto[];
}
