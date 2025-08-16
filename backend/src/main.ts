import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  const uploadsPath = join(process.cwd(), 'uploads');
  fs.mkdirSync(uploadsPath, { recursive: true });
  app.use('/uploads', express.static(uploadsPath));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
