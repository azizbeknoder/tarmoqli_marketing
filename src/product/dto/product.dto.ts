import { IsInt, IsString, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ProductTranslationDto {
  @IsString()
  language: string;  // 'en', 'ru', 'uz', 'kz', 'kg', 'tj', 'cn'

  @IsString()
  title: string;

  @IsString()
  body: string;
}

class ProductPriceDto {
  @IsString()
  currency: string; // 'USD', 'UZS', 'RUB', etc.

  @IsNumber()
  @Min(0)
  value: number;
}

export class CreateProductDto {
  @IsInt()
  term: number;

  @IsInt()
  referral_bonus: number;

  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDto)
  translations: ProductTranslationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPriceDto)
  prices: ProductPriceDto[];
}
