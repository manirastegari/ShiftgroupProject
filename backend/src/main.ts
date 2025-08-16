import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { UsersService } from './users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  const uploadsPath = join(process.cwd(), 'uploads');
  fs.mkdirSync(uploadsPath, { recursive: true });
  app.use('/uploads', express.static(uploadsPath));

  // Seed admin if configured
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Admin';
  if (adminEmail && adminPassword) {
    try {
      const usersService = app.get(UsersService);
      const existing = await usersService.findByEmail(adminEmail);
      if (!existing) {
        await usersService.createUser(adminName, adminEmail, adminPassword, 'admin');
        // eslint-disable-next-line no-console
        console.log(`[seed] Created admin user ${adminEmail}`);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[seed] Admin seed failed', e);
    }
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
