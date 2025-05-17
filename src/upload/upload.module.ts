import { Module } from '@nestjs/common';
import { FileUploadService } from './upload.service';
import { UploadController } from './upload.controller';


@Module({
  controllers: [UploadController],
  providers: [FileUploadService],
  exports:[FileUploadService]
})
export class UploadModule {}
