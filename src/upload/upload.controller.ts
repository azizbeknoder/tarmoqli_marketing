import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: FileUploadService) {}

  private static storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  private static fileFilter = (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Fayl faqat rasm (jpg, jpeg, png, gif) bo\'lishi kerak!'), false);
    }
    cb(null, true);
  };

  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: UploadController.storage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: UploadController.fileFilter,
    }),
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('Fayl topilmadi');
    const url = this.uploadService.getFileUrl(file.filename);
    return { url };
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: UploadController.storage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: UploadController.fileFilter,
    }),
  )
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) throw new Error('Fayllar topilmadi');
    const urls = files.map(file => this.uploadService.getFileUrl(file.filename));
    return { urls };
  }
}
