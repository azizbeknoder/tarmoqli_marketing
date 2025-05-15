import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomErrorFilter } from './utils/customer-error.filter';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {join} from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
  app.useGlobalFilters(new AllExceptionsFilter());
   // Swagger sozlamalari
   const config = new DocumentBuilder()
   .setTitle('My API')
   .setDescription('Product API with image upload')
   .setVersion('1.0')
   .build();
   // 'uploads' papkani /images deb statik qilib ochish
   app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
  });

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

