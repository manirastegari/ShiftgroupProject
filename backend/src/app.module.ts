import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { ContactsModule } from './contacts.module';
import { User } from './entities/user.entity';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'shiftgroup_contacts',
        entities: [User, Contact],
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/migrations/*.js'],
        logging: process.env.DB_LOGGING === 'true',
      }),
    }),
    AuthModule,
    UsersModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
