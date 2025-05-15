import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { diskStorage } from 'multer';
import { promises as fs } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/upload/upload.service';

@Injectable()
export class ProductService {
  
    constructor(
        private readonly prisma:PrismaService,
        private readonly uploadService:FileUploadService
    ){}

    async addProduct(file:Express.Multer.File,body:any){
        let imageUrl:any = null
        if(file){
            imageUrl = await this.uploadService.uploadImage(file)
        }
        return {imageUrl,body}
    }
  
}
