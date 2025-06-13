import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateStatEarningDto {
  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string;

  @ApiProperty({ example: '1000.00' })
  amount: string; // yoki number, lekin Decimal uchun string yaxshi

  @IsOptional()
  @ApiPropertyOptional({ example: 'some-widget-id' })
  @IsString()
  widgetId?: string;
}

class UpdateUserEarningDto {
  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string;

  @ApiProperty({ example: '100.00' })
  amount: string;

  @ApiProperty({ example: 'recentUserId' })
  @IsString()
  recentUserId: string;
}

class UpdateRecentUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ type: [UpdateUserEarningDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserEarningDto)
  userEarnings: UpdateUserEarningDto[];

  @IsOptional()
  @ApiPropertyOptional({ example: 'widgetId' })
  @IsString()
  widgetId?: string;
}

export class UpdateStatsWidgetDto {
  @ApiPropertyOptional({ example: 200 })
  @IsOptional()
  @IsNumber()
  onlineUserCount?: number;

  @ApiPropertyOptional({ example: '4000.00' })
  @IsOptional()
  amountEarned?: string;

  @ApiPropertyOptional({ type: [UpdateStatEarningDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateStatEarningDto)
  statEarnings?: UpdateStatEarningDto[];

  @ApiPropertyOptional({ type: [UpdateRecentUserDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRecentUserDto)
  recentUsers?: UpdateRecentUserDto[];
}
