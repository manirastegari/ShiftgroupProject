import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { User } from './entities/user.entity';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { RolesGuard } from './auth/roles.guard';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  providers: [ContactsService, RolesGuard, JwtStrategy],
  controllers: [ContactsController],
  exports: [ContactsService],
})
export class ContactsModule {}
