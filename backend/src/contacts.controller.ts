import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ContactsService } from './contacts.service';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth.guard';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from './dto/pagination.dto';

class CreateContactDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

class UpdateContactDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  photo?: string;
}

@Controller('contacts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: CreateContactDto, @Req() req: any): Promise<any> {
    const requester = { id: req.user.userId as string, role: req.user.role as 'user' | 'admin' };
    const data = { ...body, photo: file?.filename } as any;
    return this.contactsService.create(requester.id, data);
  }

  @Get()
  async findAll(@Query() q: PaginationQueryDto, @Query('search') search: string | undefined, @Req() req: any) {
    const requester = { id: req.user.userId as string, role: req.user.role as 'user' | 'admin' };
    return this.contactsService.findAllForUser(
      { id: requester.id, role: requester.role },
      { page: q.page ?? 1, limit: q.limit ?? 10, search, sortBy: q.sortBy ?? 'createdAt', sortOrder: (q.sortOrder ?? 'DESC') as 'ASC' | 'DESC' },
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const requester = { id: req.user.userId as string, role: req.user.role as 'user' | 'admin' };
    return this.contactsService.findOneById({ id: requester.id, role: requester.role }, id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateContactDto,
    @Req() req: any,
  ) {
    const requester = { id: req.user.userId as string, role: req.user.role as 'user' | 'admin' };
    const data = { ...body, photo: file?.filename } as any;
    return this.contactsService.update({ id: requester.id, role: requester.role }, id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const requester = { id: req.user.userId as string, role: req.user.role as 'user' | 'admin' };
    await this.contactsService.remove({ id: requester.id, role: requester.role }, id);
    return { success: true };
  }
}
