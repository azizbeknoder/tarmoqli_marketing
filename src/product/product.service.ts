import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import CustomError from 'src/utils/custom-error';


@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto,user:any) {
    const oldUser = await this.prisma.users.findFirst({where:{email:user.email}})
    if(!oldUser){
      throw new CustomError(404,'user not found')
    }
    const data = await this.prisma.product.create({
      data: {
        created_user: oldUser.id,
        rating: dto.rating,
        rewiev: dto.rewiev,
        count:dto.count,
        coin:dto.coin,
        translations: {
          createMany: {
            data: dto.translations,
          },
        },
        photo_url: {
          createMany: {
            data: dto.photo_url.map((img) => ({ photo_url: img.photo_url })),
          },
        },
      },
      include: {
        translations: true,

        photo_url: true,
      },
    });
    return data
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        photo_url: true,
        translations: true,

      },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        photo_url: true,
        translations: true,

      },
    });
  }

  async update(id: number, dto: any) {
    // 1. Product mavjudligini tekshir
    const oldProduct = await this.prisma.product.findUnique({ where: { id } });
    if (!oldProduct) {
      throw new CustomError(404, 'Product not found');
    }
  
    // 2. Product asosiy ma’lumotlarini yangilash
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        count: dto.count,
        rating: dto.rating,
        rewiev: dto.rewiev,
        coin: dto.coin,
  
        // 3. translations ni tozalab, yangilarini qo‘shish
        translations: {
          deleteMany: {}, // hammasini o‘chir
          createMany: {
            data: dto.translations,
          },
        },
  
        // 4. photo_url larni ham xuddi shu tarzda
        photo_url: {
          deleteMany: {}, // eski rasmlarni o‘chir
          createMany: {
            data: dto.photo_url.map((img) => ({ photo_url: img.photo_url })),
          },
        },
      },
      include: {
        translations: true,
        photo_url: true,
      },
    });
  
    return updatedProduct;
  }
  

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
