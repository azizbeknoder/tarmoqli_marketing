import { IsInt, IsString, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductTranslationDto {
  @ApiProperty({example:"'en', 'ru', 'uz', 'kz', 'kg', 'tj', 'cn'",description:"Shu mavjud tillar kiritilishi mumkun"})
  @IsString()
  language: string;  // 'en', 'ru', 'uz', 'kz', 'kg', 'tj', 'cn'

  @ApiProperty({example:"Premium",description:"Product sarlavhasi"})
  @IsString()
  title: string;

  @ApiProperty({example:"Premium obuna barhca imkoniyatlar beradi",description:"Product haqidagi malumotlar"})
  @IsString()
  body: string;
}

class ProductPriceDto {
  @ApiProperty({example:"'USD', 'UZS', 'RUB', etc",description:"Kiritiladigon valyuta birligi"})
  @IsString()
  currency: string; // 'USD', 'UZS', 'RUB', etc.

  @ApiProperty({example:1000,description:"Kiritiladigon summa miqdori"})
  @IsNumber()
  @Min(0)
  value: number;
}

export class CreateProductDto {
  @ApiProperty({example:30,description:"Mahsulot muddati"})
  @IsInt()
  term: number;

  @ApiProperty({example:20,description:"Referal uchun necha foiz bonus berishi"})
  @IsInt()
  referral_bonus: number;

  @ApiProperty({ type: [ProductTranslationDto] })
@IsArray()
@ValidateNested({ each: true })
@Type(() => ProductTranslationDto)
translations: ProductTranslationDto[];

@ApiProperty({ type: [ProductPriceDto] })
@IsArray()
@ValidateNested({ each: true })
@Type(() => ProductPriceDto)
prices: ProductPriceDto[];

}
