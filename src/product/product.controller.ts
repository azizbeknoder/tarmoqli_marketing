import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from 'src/upload/upload.decorator';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly service:ProductService){}

    @Post('add')
    @UseGuards(AuthGuard)
    @FileUpload('image')
    async productAdd(
        @UploadedFile() file: Express.Multer.File,
        @Body() bodyy: any,
        @Req() req:any
      ) 
      {
        
          const parsed = JSON.parse(bodyy.body);
          const data = await this.service.addProduct(parsed,file,req.user)
          return data
      }
    @Get()
    async getAll(){
        const data = await this.service.getAll()
        return data
    }
    @Get(':id')
    async getOne(@Param('id') id:string){
        const data = await this.service.getOne(id)
        return data
    }
    @Delete(":id")
    async delete(@Param('id') id:string){
        const data = await this.service.delete(id)
        return data

    }
      
}
