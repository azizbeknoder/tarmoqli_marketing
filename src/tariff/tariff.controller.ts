import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreatedTariffDto, UpdateTariffDto } from './dto/tariff.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('tariff')
export class TariffController {
  constructor(private readonly service: TariffService) {}

  @Post('add')
  @ApiOperation({ summary: "Tariff qo'shish uchun" })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  async tarifAdd(
    @Body() body: CreatedTariffDto,
    @Req() req: any,
  ) {
    // return 'hello world'
    const data = await this.service.addProduct(body, req.user);
    return data;
  }

  @Get()
  @ApiOperation({ summary: "Barcha tariflarni olish uchun" })
  @ApiResponse({ status: 200, description: 'success' })
//   @UseGuards(AuthGuard)
  async getAll() {
    const data = await this.service.getAll();
    return data;
  }


  @Get(':id')
  @ApiOperation({ summary: "Tarifni id si bo'yicha olish" })
  @ApiResponse({ status: 200, description: 'success' })
//   @UseGuards(AuthGuard)
  async getOne(@Param('id') id: string) {
    const data = await this.service.getOne(id);
    return data;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tarif o'chirish" })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  async delete(@Param('id') id: string) {
    const data = await this.service.delete(id);
    return data;
  }

  @Put('update/:id')
  @ApiOperation({ summary: "Tarifni yangilash uchun" })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  async tarifUpdate(
    @Param('id') id: string,
    @Body() body: UpdateTariffDto,
    @Req() req: any,
  ) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      throw new BadRequestException('Id noto‘g‘ri kiritilgan');
    }
    const data = await this.service.updateProduct(productId, body, req.user);
    return data;
  }
}
