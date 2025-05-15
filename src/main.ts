import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomErrorFilter } from './utils/customer-error.filter';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import createSuperAdmin from './script/create-super-admin';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global Validation Pipe (DTO uchun)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // DTO da yo'q atributlarni avtomatik olib tashlash
      forbidNonWhitelisted: true, // noma'lum atribut bo'lsa xato chiqarish
      transform: true,            // stringlarni kerakli tipga avtomatik o‘zgartirish
    }),
  );

  // Global Exception Filters
  app.useGlobalFilters(new CustomErrorFilter());
  // Agar AllExceptionsFilter kerak bo'lsa, uni ham shu yerga qo'shing
  // app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger dokumentatsiyasini sozlash
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Product API with image upload')
    .setVersion('1.0')
    // Agar JWT auth qo'shmoqchi bo'lsangiz, qo'shing:
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger docs url: http://localhost:3000/api

  // 'uploads' papkasini static qilib ulash
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await createSuperAdmin()
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
