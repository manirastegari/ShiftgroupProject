import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard, Roles } from './auth/roles.guard';
import { JwtAuthGuard } from './auth.guard';
import { IsIn, IsOptional } from 'class-validator';

class UpdateUserRoleDto {
  @IsIn(['user', 'admin'])
  role: 'user' | 'admin';
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  async list(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.usersService.listUsers({ page: parseInt(page, 10), limit: parseInt(limit, 10) });
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id/role')
  @Roles('admin')
  async updateRole(@Param('id') id: string, @Body() body: UpdateUserRoleDto) {
    return this.usersService.updateUserRole(id, body.role);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return { success: true };
  }
}


