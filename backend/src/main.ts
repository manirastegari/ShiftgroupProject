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
  const adminEmail = process.env.ADMIN_EMAIL || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || '123456';
  const adminName = process.env.ADMIN_NAME || 'Admin User';
  if (adminEmail && adminPassword) {
    try {
      const usersService = app.get(UsersService);
      const existing = await usersService.findByEmail(adminEmail);
      if (!existing) {
        await usersService.createUser(adminName, adminEmail, adminPassword, 'admin');
        // eslint-disable-next-line no-console
        console.log(`[seed] Created admin user ${adminEmail} with password ${adminPassword}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`[seed] Admin user ${adminEmail} already exists`);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[seed] Admin seed failed', e);
    }
  }

  // Always create hardcoded admin user
  try {
    const usersService = app.get(UsersService);
    const existingAdmin = await usersService.findByEmail('admin@shiftgroup.com');
    if (!existingAdmin) {
      await usersService.createUser('Admin User', 'admin@shiftgroup.com', '123456', 'admin');
      // eslint-disable-next-line no-console
      console.log('[seed] Created hardcoded admin user: admin@shiftgroup.com / 123456');
    } else {
      // eslint-disable-next-line no-console
      console.log('[seed] Hardcoded admin user already exists');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[seed] Hardcoded admin creation failed', e);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
