import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetPasswordToken1779300000000 implements MigrationInterface {
  name = 'AddResetPasswordToken1779300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "reset_password_token"`);
  }
}
