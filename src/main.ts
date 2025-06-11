import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomErrorFilter } from './utils/customer-error.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import createSuperAdmin from './script/create-super-admin';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import * as coocieParser from 'cookie-parser'

async function bootstrap() {
  // NestJS ilovasini NestExpressApplication tipida yaratamiz (statik fayllar uchun kerak)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ConfigService ni olish uchun
  const configService = app.get(ConfigService);

  // Global ValidationPipe: kiruvchi ma'lumotlarni yvalidatsiya qiladi
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // faqat DTO da belgilangan propertylarni ruxsat beradi
      forbidNonWhitelisted: true, // ruxsat etilmagan property bo'lsa xato beradi
      transform: true, // kiruvchi ma'lumotlarni DTO klassiga o'zgartiradi
    }),
  );
  BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  app.useStaticAssets(join(__dirname, '..', ''));
  // Global Exception Filter: xatolarni global tutib, mos javob beradi
  app.useGlobalFilters(new CustomErrorFilter());
  

  // Swagger sozlamalari
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Product API with image upload')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
    
    

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, document);

  // Statik fayllar uchun `/uploads` papkasini xizmatga qo'yish
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL manzil oldidan /uploads/ prefiksi qo'shiladi
  });

  // Dastlabki superadmin yaratish (agar kerak bo'lsa)
  await createSuperAdmin();

  // PORT ni olish (env dan yoki default 3000)
  const port = configService.get<number>('PORT') || 3000;
  app.use(coocieParser());

  app.enableCors(); // CORS ni yoqish

  // Serverni ishga tushirish
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' umumiy IPda ishga tushirish (render.com kabi platformalar uchun)

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger at http://localhost:${port}/api`);
}

bootstrap();
