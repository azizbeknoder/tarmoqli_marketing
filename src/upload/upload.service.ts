import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  private readonly uploadPath = './uploads';
  constructor(private config:ConfigService){}
  static getMulterConfig(fieldname: string) {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = `${fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          cb(null, unique + ext);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Faqat rasm yuklash mumkin!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 2MB
      },
    };
  }

  async uploadImage(file: Express.Multer.File) {
    const imagesBaseUrl = this.config.get<string>('IMAGES_BASE_URL');
    const data = await `${imagesBaseUrl}/images/${file[0].path}`;
    return data
  }

  deleteImage(filename: string): void {
    const path = `/${filename}`;
    let url = `/uploads/${path.split('/')[5]}`
    if (existsSync(url)) {
      unlinkSync(url);
    }
  }
}


