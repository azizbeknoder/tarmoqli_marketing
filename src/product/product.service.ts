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

  update(id: number, dto: any) {
    return this.prisma.product.update({
      where: { id },
      data: {
        count: dto.count,
        rating: dto.rating,
        rewiev: dto.rewiev,
        coin:dto.coin
        // Note: updateMany yoki delete/createMany qilish mumkin tafsilotga qarab
      },
      include: {
        photo_url: true,
        translations: true,
        // prices: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
