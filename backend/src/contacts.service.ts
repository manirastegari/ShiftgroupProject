import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { User } from './entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(ownerId: string, data: Partial<Contact>): Promise<Contact> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) throw new NotFoundException('Owner not found');
    const contact = this.contactRepository.create({ ...data, owner });
    return this.contactRepository.save(contact);
  }

  async findAllForUser(
    requester: { id: string; role: 'user' | 'admin' },
    options: { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
  ) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'DESC' } = options;
    const skip = (page - 1) * limit;

    const qb = this.contactRepository
      .createQueryBuilder('contact')
      .leftJoin('contact.owner', 'owner')
      .addSelect(['owner.id'])
      .skip(skip)
      .take(limit)
      .orderBy(`contact.${sortBy}`, sortOrder);

    if (requester.role !== 'admin') {
      qb.where('owner.id = :ownerId', { ownerId: requester.id });
    }

    if (search) {
      qb.andWhere('(LOWER(contact.name) LIKE :q OR LOWER(contact.email) LIKE :q)', {
        q: `%${search.toLowerCase()}%`,
      });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOneById(requester: { id: string; role: 'user' | 'admin' }, id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id }, relations: { owner: true } });
    if (!contact) throw new NotFoundException('Contact not found');
    if (requester.role !== 'admin' && contact.owner.id !== requester.id) {
      throw new ForbiddenException('Not allowed');
    }
    return contact;
  }

  async update(
    requester: { id: string; role: 'user' | 'admin' },
    id: string,
    data: Partial<Contact>,
  ): Promise<Contact> {
    const contact = await this.findOneById(requester, id);
    Object.assign(contact, data);
    return this.contactRepository.save(contact);
  }

  async remove(requester: { id: string; role: 'user' | 'admin' }, id: string): Promise<void> {
    const contact = await this.findOneById(requester, id);
    await this.contactRepository.remove(contact);
  }
}
