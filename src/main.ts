import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomErrorFilter } from './utils/customer-error.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import createSuperAdmin from './script/create-super-admin';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService); // 👈 to‘g‘ri yo‘li shu!

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global Exception Filter
  app.useGlobalFilters(new CustomErrorFilter());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Product API with image upload')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Static 'uploads'
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Superadmin yaratish
  await createSuperAdmin();

  const port = configService.get<number>('PORT') || 3000; // ✅ PORT ni olamiz
  await app.listen(port, '0.0.0.0'); // ✅ render.com uchun to‘g‘risi

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger at http://localhost:${port}/api`);
}

bootstrap();
