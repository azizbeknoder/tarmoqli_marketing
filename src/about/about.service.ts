import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';
import { UpdateAboutDto } from './dto/about.dto';

@Injectable()
export class AboutService {
   constructor(private prisma:PrismaService){}
  async getAbout(){
    const result = await this.prisma.about.findFirst({include:{aboutTranslation:true}})
    return result
  }
  async deleteAbout(){
    const result = await this.prisma.about.deleteMany()
    return result
  }
  async update( dto: UpdateAboutDto) {
    const about = await this.prisma.about.findUnique({
      where: {id: 2 },
    });
  
    if (!about) {
      throw new CustomError(404, 'About topilmadi');
    }
  
    const updated = await this.prisma.about.update({
      where: { id: 2 },
      data: {
        aboutTranslation: {
          deleteMany: {}, // eski tarjimalarni o‘chirish
          createMany: {
            data: dto.translations.map((item) => ({
              language: item.language,
              heroTitle: item.heroTitle,
              heroDescription: item.heroDescription,
              howWorkSystem: item.howWorkSystem,
              withPlansTitle: item.withPlansTitle,
              withPlansDescription: item.withPlansDescription,
              referalTitle: item.referalTitle,
              referalDescription: item.referalDescription,
              levelTitle: item.levelTitle,
              levelDescription: item.levelDescription,
              USDTTitle: item.USDTTitle,
              USDTDescription: item.USDTDescription,
            })),
          },
        },
      },
      include: {
        aboutTranslation: true,
      },
    });
  
    return updated;
  }
  
}
