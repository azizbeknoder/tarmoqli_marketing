import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from 'src/upload/upload.decorator';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly service:ProductService){}
    @Post('add')
    @FileUpload('image')
    async productAdd(@UploadedFile() file: Express.Multer.File, @Body() body:any, @Req() req:any){
        const data = await this.service.addProduct(file,body)
        console.log(data);
        
    }
}
