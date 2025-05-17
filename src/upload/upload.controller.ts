import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
  constructor(private configService: ConfigService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // saqlash papkasi, loyihangiz ildizida 'uploads' papka bo'lishi kerak
        filename: (req, file, cb) => {
          // fayl nomini noyob qilib qo'yamiz
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Maksimal fayl hajmi 5MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Fayl faqat rasm (jpg, jpeg, png, gif) bo\'lishi kerak!'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Fayl yuklanmadi!');
    }

    const baseUrl = this.configService.get<string>('IMAGES_BASE_URL') || 'http://localhost:3000';

    // Yuklangan faylga to'liq URL yaratamiz
    const fileUrl = `${baseUrl}/uploads/${file.filename}`;

    return { url: fileUrl };
  }
}
