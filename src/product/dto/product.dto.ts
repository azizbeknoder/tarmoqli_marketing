import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductImageDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsNotEmpty()
  photo_url: string
}

export class ProductTranslationDto {
  @ApiProperty({ example: 'en', description: 'Til kodi (masalan: en, ru, uz)' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'Premium Tariff', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Short description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Detailed info about product', required: false })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @ApiProperty({ example: 'Feature list', required: false })
  @IsOptional()
  @IsString()
  features?: string;

  @ApiProperty({ example: 'How to use this product', required: false })
  @IsOptional()
  @IsString()
  usage?: string;
}

// export class ProductPriceDto {
//   @ApiProperty({ example: 'USD', description: 'Valyuta turi' })
//   @IsString()
//   currency: string;

//   @ApiProperty({ example: 19.99 })
//   @IsInt()
//   value: number;
// }

export class CreateProductDto {
  @ApiProperty({ example: 5, description: 'Reyting (1-5 oralig‘ida)' })
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 100, description: 'Sharhlar soni' })
  @IsNumber()
  rewiev: number;

  @ApiProperty({example:10,description:"Product soni"})
  @IsNumber()
  count:number

  @ApiProperty({
    type: [ProductImageDto],
    description: 'Mahsulotga tegishli rasm URL lar',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  photo_url: ProductImageDto[];

  @ApiProperty({example:1,description:"Maxsulotning narxi tokenda"})
  @IsNumber()
  coin:number
  

  @ApiProperty({
    type: [ProductTranslationDto],
    description: 'Mahsulot tarjimalari (ko‘p tillilik)',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDto)
  translations: ProductTranslationDto[];

  
}
