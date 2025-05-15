import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Prisma service manzilingizga moslang
import { CreateProductDto } from './dto/product.dto';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import CustomError from 'src/utils/custom-error';
import { FileUploadService } from 'src/upload/upload.service';

@Injectable()
export class ProductService {
  
  constructor(private readonly prisma: PrismaService,private config:ConfigService ,private upload:FileUploadService)  {}

  async addProduct(dto: CreateProductDto, file: Express.Multer.File,user:any) {
    const imagesBaseUrl = this.config.get<string>('IMAGES_BASE_URL');
    const photoUrl = `${imagesBaseUrl}/uploads/${file.filename}`; // agar statik fayllarni shu yo'l bilan xizmat qilayotgan bo'lsangiz

    let oldUser = await this.prisma.users.findMany({where:{email:user.email}})
    let user_id = oldUser[0].id
    
    
    
    const data = await this.prisma.products.create({
                
      data: {
        term: dto.term,
        referral_bonus: dto.referral_bonus,
        photo_url: photoUrl,
        created_user:user_id,
        translations: {
          create: dto.translations.map(t => ({
            language: t.language,
            title: t.title,
            body: t.body,
          })),
        },
        prices: {
          create: dto.prices.map(p => ({
            currency: p.currency,
            value: p.value,
          })),
        },
      },
      include: {
        translations: true,
        prices: true,
      },
    });

    return  data
  }
  async getAll(){
    const result = await this.prisma.products.findMany({
      include: {
        translations: true,  // bog‘langan tarjimalar jadvali
        prices: true,        // bog‘langan narxlar jadvali
      }
    });
    
    return result
  }
  async getOne(id: string) {
    const result = await this.prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        translations: true,
        prices: true,
      }
    });
  
    return result;
  }
  async delete(id:string){
    const oldProduct = await this.prisma.products.findMany({where:{id:Number(id)}})
    if(!oldProduct[0]){
      throw new CustomError(404,"Bunday qiymat topilmadi")
    }
    console.log(oldProduct);
    
    const photoResult = await this.upload.deleteImage(oldProduct[0].photo_url)
    const result = await this.prisma.products.delete({where:{id:Number(id)}})
    return result 
  }
  
}

