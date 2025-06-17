import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatedTariffDto, UpdateTariffDto } from './dto/tariff.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class TariffService {
  constructor(private readonly prisma: PrismaService) {}

  async addProduct(dto: CreatedTariffDto, user: any) {

    const data = await this.prisma.tariff.create({
      data: {
        term: dto.term,
        referral_bonus: dto.referral_bonus,
        photo_url: dto.photo_url,
        coin:dto.coin,
        dailyProfit:Number(dto.dailyProfit),
        translations: {
          create: dto.translations.map(t => ({
            language: t.language,
            name: t.name,
            description: t.description,
            longDescription: t.longDescription,
            features: t.features,
            usage: t.usage,
          })),
        },
        // prices: {
        //   create: dto.prices.map(p => ({
        //     currency: p.currency,
        //     value: p.value,
        //   })),
        // },
      },
      include: {
        translations: true,
        // prices: true,
      },
    });
    

    return data;
  }

  async getAll() {
    const result = await this.prisma.tariff.findMany({
      include: {
        translations: true,
        // prices: true,
      },
    });
    return result;
  }

  async getOne(id: string) {
    const result = await this.prisma.tariff.findUnique({
      where: { id: Number(id) },
      include: {
        translations: true,
        // prices: true,
      },
    });

    return result;
  }

  async delete(id: string) {
    const oldProduct = await this.prisma.tariff.findUnique({ where: { id: Number(id) } });
    if (!oldProduct) {
      throw new CustomError(404, 'Bunday qiymat topilmadi');
    }

    const result = await this.prisma.tariff.delete({ where: { id: Number(id) } });
    return result;
  }

  async updateProduct(
    productId: number,
    dto: UpdateTariffDto,
    user: any,
  ) {
    const oldUser = await this.prisma.users.findFirst({
      where: { email: user.email },
    });
  
    if (!oldUser) {
      throw new CustomError(404, 'User topilmadi');
    }
  
    const updateData: any = {};
  
    if (dto.term !== undefined) {
      updateData.term = dto.term;
    }
  
    if (dto.referral_bonus !== undefined) {
      updateData.referral_bonus = dto.referral_bonus;
    }
  
    if (dto.dailyProfit !== undefined) {
      updateData.dailyProfit = dto.dailyProfit;
    }
  
    if (dto.coin !== undefined) {
      updateData.coin = dto.coin;
    }
  
    if (dto.photo_url !== undefined) {
      updateData.photo_url = dto.photo_url;
    }
  
    // Tarjimalarni yangilash
    if (dto.translations && dto.translations.length > 0) {
      // Eski tarjimalarni o‘chirish
      await this.prisma.tariffTranslation.deleteMany({
        where: { tariff_id: productId },
      });
  
      // Yangi tarjimalarni ulash uchun create massivini qo‘shamiz
      updateData.translations = {
        create: dto.translations.map(t => ({
          language: t.language,
          name: t.name,
          description: t.description,
          longDescription: t.longDescription,
          features: t.features,
          usage: t.usage,
        })),
      };
    }
  
    // Yangilash
    const updatedTariff = await this.prisma.tariff.update({
      where: { id: productId },
      data: updateData,
      include: {
        translations: true,
      },
    });
  
    return updatedTariff;
  }
  
  
}
