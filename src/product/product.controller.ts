import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from 'src/upload/upload.decorator';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly service:ProductService){}

    @Post('add')
    @ApiOperation({ summary: "Product qo'shish uchun" })
    @ApiResponse({ status: 200, description: 'success' })
    @UseGuards(AuthGuard, AdminGuard)
    @FileUpload('image') // bu sizning custom decorator
    async productAdd(
      @UploadedFile() file: Express.Multer.File,
      @Body('body') bodyRaw: string,
      @Req() req: any
    ) {
      const body: CreateProductDto = JSON.parse(bodyRaw); // JSON string bo‘lsa
      const data = await this.service.addProduct(body, file, req.user);
      return data;
    }


    @Get()
    @ApiOperation({summary:"Barcha productlarni olish uchun"})
    @ApiResponse({status:200,description:'success'})
    @UseGuards(AuthGuard)
    async getAll(){
        const data = await this.service.getAll()
        return data
    }

    @Get(':id')
    @ApiOperation({summary:"Productni id si bo'yicha olish"})
    @ApiResponse({status:200,description:'success'})
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id:string){
        const data = await this.service.getOne(id)
        return data
    }

    @Delete(":id")
    @ApiOperation({summary:"Product o'chirish"})
    @ApiResponse({status:200,description:'success'})
    @UseGuards(AuthGuard,AdminGuard)
    async delete(@Param('id') id:string){
        const data = await this.service.delete(id)
        return data
    }
    
}
