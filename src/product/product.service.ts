import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async addProduct(dto: CreateProductDto, user: any) {

    // Userni olish
    const oldUser = await this.prisma.users.findFirst({ where: { email: user.email } });
    if (!oldUser) {
      throw new CustomError(404, 'User topilmadi');
    }
    const user_id = oldUser.id;
    // Mahsulot yaratish
    const data = await this.prisma.products.create({
      
      data: {
        term: dto.term,
        referral_bonus: dto.referral_bonus,
        photo_url: dto.photo_url,  // Front-enddan keladi
        created_user: user_id,
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

    return data;
  }

  async getAll() {
    const result = await this.prisma.products.findMany({
      include: {
        translations: true,
        prices: true,
      },
    });
    return result;
  }

  async getOne(id: string) {
    const result = await this.prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        translations: true,
        prices: true,
      },
    });

    return result;
  }

  async delete(id: string) {
    const oldProduct = await this.prisma.products.findUnique({ where: { id: Number(id) } });
    if (!oldProduct) {
      throw new CustomError(404, 'Bunday qiymat topilmadi');
    }

    // Agar siz rasmni serverdan o'chirishni xohlasangiz,
    // upload service yordamida shu yerda o'chirishni qo'shishingiz mumkin.

    const result = await this.prisma.products.delete({ where: { id: Number(id) } });
    return result;
  }

  async updateProduct(
    productId: number,
    dto: UpdateProductDto,
    user: any,
  ) {
    // Userni olish
    const oldUser = await this.prisma.users.findFirst({ where: { email: user.email } });
    if (!oldUser) {
      throw new CustomError(404, 'User topilmadi');
    }
    const user_id = oldUser.id;

    // Yangilash uchun obekt tayyorlash
    const updateData: any = {
      created_user: user_id,
    };

    if (dto.term !== undefined) {
      updateData.term = dto.term;
    }

    if (dto.referral_bonus !== undefined) {
      updateData.referral_bonus = dto.referral_bonus;
    }

    if (dto.photo_url !== undefined) {
      updateData.photo_url = dto.photo_url;
    }

    if (dto.translations) {
      // Avval translationlarni o'chirish
      await this.prisma.productTranslation.deleteMany({
        where: { productId: productId },
      });

      // Keyin yangilarini yaratish
      updateData.translations = {
        create: dto.translations.map(t => ({
          language: t.language,
          title: t.title,
          body: t.body,
        })),
      };
    }

    if (dto.prices) {
      // Avval narxlarni o'chirish
      await this.prisma.productPrice.deleteMany({
        where: { productId: productId },
      });

      // Keyin yangilarini yaratish
      updateData.prices = {
        create: dto.prices.map(p => ({
          currency: p.currency,
          value: p.value,
        })),
      };
    }

    // Productni yangilash
    const updatedProduct = await this.prisma.products.update({
      where: { id: productId },
      data: updateData,
      include: {
        translations: true,
        prices: true,
      },
    });

    return updatedProduct;
  }
}
