import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1734400000000 implements MigrationInterface {
  name = 'InitSchema1734400000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "email" character varying NOT NULL,
      "name" character varying NOT NULL,
      "passwordHash" character varying NOT NULL,
      "role" character varying NOT NULL DEFAULT 'user',
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "UQ_users_email" UNIQUE ("email"),
      CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "contacts" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" character varying NOT NULL,
      "email" character varying,
      "phone" character varying,
      "photo" character varying,
      "ownerId" uuid,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "PK_contacts_id" PRIMARY KEY ("id"),
      CONSTRAINT "FK_contacts_owner" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE
    )`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_contacts_name" ON "contacts" ("name")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_contacts_email" ON "contacts" ("email")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "contacts"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}


