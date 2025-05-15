import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './upload.service';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

export function FileUpload(fieldname: string) {
  const config = FileUploadService.getMulterConfig(fieldname);

  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldname, config)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldname]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
