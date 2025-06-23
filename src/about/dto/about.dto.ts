import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';

export class AboutTranslationDto {
  @ApiProperty({ example: 'en', description: 'Til kodi (en, ru, uz, ...)' })
  @IsOptional()
  @IsString()
  language: string;

  @ApiProperty({ example: 'Welcome to our platform!' })
  @IsOptional()
  @IsString()
  heroTitle: string;

  @ApiProperty({ example: 'This is how we work...' })
  @IsOptional()
  @IsString()
  heroDescription: string;

  @ApiProperty({ example: 'System workings described here...' })
  @IsOptional()
  @IsString()
  howWorkSystem: string;

  @ApiProperty({ example: 'Our Plans' })
  @IsOptional()
  @IsString()
  withPlansTitle: string;

  @ApiProperty({ example: 'We offer several flexible plans...' })
  @IsOptional()
  @IsString()
  withPlansDescription: string;

  @ApiProperty({ example: 'Referral System' })
  @IsOptional()
  @IsString()
  referalTitle: string;

  @ApiProperty({ example: 'Invite friends and earn rewards' })
  @IsOptional()
  @IsString()
  referalDescription: string;

  @ApiProperty({ example: 'Our Levels' })
  @IsOptional()
  @IsString()
  levelTitle: string;

  @ApiProperty({ example: 'There are 5 levels in our system...' })
  @IsOptional()
  @IsString()
  levelDescription: string;

  @ApiProperty({ example: 'USDT Info' })
  @IsOptional()
  @IsString()
  USDTTitle: string;

  @ApiProperty({ example: 'You can use USDT to buy plans...' })
  @IsOptional()
  @IsString()
  USDTDescription: string;
}

export class UpdateAboutDto {
  @ApiProperty({
    type: [AboutTranslationDto],
    description: 'Tarjimalar (en, ru, uz, ...)',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutTranslationDto)
  translations: AboutTranslationDto[];
}
