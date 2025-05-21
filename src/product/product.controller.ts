import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
  } from '@nestjs/common';


  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/product.dto';
import { ProductsService } from './product.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
  
  @ApiTags('Products')
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Yangi mahsulot yaratish' })
    @ApiResponse({ status: 201, description: 'Mahsulot muvaffaqiyatli yaratildi' })
    @UseGuards(AuthGuard,AdminGuard)
    create(@Body() createProductDto: CreateProductDto,@Req() req:any) {
      
      
      return this.productsService.create(createProductDto,req.user);
    }
  
    @Get()
    @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })
    findAll() {
      return this.productsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'ID bo‘yicha mahsulotni olish' })
    findOne(@Param('id') id: string) {
      return this.productsService.findOne(+id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Mahsulotni yangilash' })
    @UseGuards(AuthGuard,AdminGuard)
    update(@Param('id') id: string, @Body() updateProductDto: any) {
      return this.productsService.update(+id, updateProductDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Mahsulotni o‘chirish' })
    @UseGuards(AuthGuard,AdminGuard)
    remove(@Param('id') id: string) {
      return this.productsService.remove(+id);
    }
  }
  