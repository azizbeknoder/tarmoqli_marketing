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

  uploadImage(file: Express.Multer.File): string {
    const imagesBaseUrl = this.config.get<string>('IMAGES_BASE_URL');
    return `${imagesBaseUrl}/images/${file.filename}`;
  }

  deleteImage(filename: string): void {
    const path = `${this.uploadPath}/${filename}`;
    if (existsSync(path)) {
      unlinkSync(path);
    }
  }
}
