import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(name: string, email: string, password: string, role: 'user' | 'admin' = 'user'): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, passwordHash, role });
    return this.userRepository.save(user);
  }

  async listUsers({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const [data, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateUserRole(id: string, role: 'user' | 'admin') {
    await this.userRepository.update({ id }, { role });
    return this.findById(id);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete({ id });
  }
}
