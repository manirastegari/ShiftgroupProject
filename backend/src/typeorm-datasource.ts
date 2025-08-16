import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Contact } from './entities/contact.entity';
import { InitSchema1734400000000 } from './migrations/1734400000000-InitSchema';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'shiftgroup_contacts',
  entities: [User, Contact],
  migrations: [InitSchema1734400000000],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});

export default AppDataSource;


