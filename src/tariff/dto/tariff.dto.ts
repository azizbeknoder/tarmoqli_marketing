import { IsInt, IsString, IsArray, ValidateNested, IsNumber, Min, IsOptional, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class TariffTranslateDto {
  @ApiProperty({ example: "'en', 'ru', 'uz'", description: "Shu mavjud tillar kiritilishi mumkun" })
  @IsString()
  language: string;

  @ApiProperty({ example: "Premium", description: "Tariff nomi" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Qisqa tarif tavsifi", description: "Short description" })
  @IsString()
  description: string;

  @ApiProperty({ example: "Uzunroq tafsilotli tarif haqida", description: "To‘liq izoh" })
  @IsString()
  longDescription: string;

  @ApiProperty({ example: "Imkoniyatlar ro‘yxati", description: "Tarifdagi xususiyatlar" })
  @IsString()
  features: string;

  @ApiProperty({ example: "Foydalanish yo‘riqnomasi", description: "Qanday foydalaniladi" })
  @IsString()
  usage: string;

  
}


// class TariffPriceDto {
//   @ApiProperty({example:"'USD', 'UZS', 'RUB', etc",description:"Kiritiladigon valyuta birligi"})
//   @IsString()
//   currency: string; // 'USD', 'UZS', 'RUB', etc.

//   @ApiProperty({example:1000,description:"Kiritiladigon summa miqdori"})
//   @IsNumber()
//   @Min(0)
//   value: number;
// }

export class CreatedTariffDto {
  @ApiProperty({example:30,description:"Mahsulot muddati"})
  @IsNumber()
  term: number;

  @ApiProperty({example:20,description:"Referal uchun necha foiz bonus berishi"})
  @IsNumber()
  referral_bonus: number;

  // Yangi qo‘shilgan maydon: rasm URL
  @ApiProperty({ example: 'http://localhost:3000/uploads/filename.jpg', description: 'Mahsulot rasmi URL manzili' })
  @IsString()
  photo_url: string;

  @ApiProperty({ type: [TariffTranslateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TariffTranslateDto)
  translations: TariffTranslateDto[];

  // @ApiProperty({ type: [TariffPriceDto] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => TariffPriceDto)
  // prices: TariffPriceDto[];

  @ApiProperty({example:13,description:"Tarifning narxi coin bilan"})
  @IsNumber()
  coin:number

  @ApiProperty({example:1,description:"Kunlik cashback miqdori"})
  @IsNumber()
  dailyProfit:number
}

export class UpdateTariffDto {
  @ApiPropertyOptional({ example: 30, description: "Mahsulot muddati" })
  @IsNumber()
  @IsOptional()
  term?: number;

  @ApiPropertyOptional({ example: 20, description: "Referal uchun necha foiz bonus berishi" })
  @IsNumber()
  @IsOptional()
  referral_bonus?: number;

  // Photo URL ham ixtiyoriy bo‘ladi update uchun
  @ApiPropertyOptional({ example: 'http://localhost:3000/uploads/filename.jpg', description: 'Mahsulot rasmi URL manzili' })
  @IsString()
  @IsOptional()
  photo_url?: string;

  @ApiPropertyOptional({ type: [TariffTranslateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TariffTranslateDto)
  @IsOptional()
  translations?: TariffTranslateDto[];

  @ApiProperty({example:1,description:"Coin uchun"})
  @IsNumber()
  @IsOptional()
  coin?:number

  @ApiProperty({example:123,description:'Kunlik foyda'})
  @IsNumber()
  @IsOptional()
  dailyProfit:number

  // @ApiPropertyOptional({ type: [TariffPriceDto] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => TariffPriceDto)
  // @IsOptional()
  // prices?: TariffPriceDto[];
}

