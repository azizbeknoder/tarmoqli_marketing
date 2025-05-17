import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './upload.service';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

export function FileUpload(fieldname: string, maxCount = 10) {
  const config = FileUploadService.getMulterConfig(fieldname);

  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldname, maxCount, config)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldname]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    }),
  );
}
