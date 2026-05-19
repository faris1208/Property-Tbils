import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscribers1779100000000 implements MigrationInterface {
  name = 'CreateSubscribers1779100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "subscribers" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "phone" character varying,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_subscribers_email" UNIQUE ("email"),
        CONSTRAINT "PK_subscribers" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subscribers"`);
  }
}
