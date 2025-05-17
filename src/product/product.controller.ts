import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post('add')
  @ApiOperation({ summary: "Product qo'shish uchun" })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(AuthGuard, AdminGuard)
  async productAdd(
    @Body() body: CreateProductDto,
    @Req() req: any,
  ) {
    console.log(body);
    
    const data = await this.service.addProduct(body, req.user);
    return data;
  }

  @Get()
  @ApiOperation({ summary: "Barcha productlarni olish uchun" })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(AuthGuard)
  async getAll() {
    const data = await this.service.getAll();
    return data;
  }

  @Get(':id')
  @ApiOperation({ summary: "Productni id si bo'yicha olish" })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(AuthGuard)
  async getOne(@Param('id') id: string) {
    const data = await this.service.getOne(id);
    return data;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Product o'chirish" })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(AuthGuard, AdminGuard)
  async delete(@Param('id') id: string) {
    const data = await this.service.delete(id);
    return data;
  }

  @Put('update/:id')
  @ApiOperation({ summary: "Productni yangilash uchun" })
  @ApiResponse({ status: 200, description: 'success' })
  @UseGuards(AuthGuard, AdminGuard)
  async productUpdate(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
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
