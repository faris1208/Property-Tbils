import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexes1779200000000 implements MigrationInterface {
  name = 'AddIndexes1779200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_city" ON "properties" ("city")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_approval_status" ON "properties" ("approval_status")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_status" ON "properties" ("status")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_type" ON "properties" ("type")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_agent_id" ON "properties" ("agent_id")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_is_featured" ON "properties" ("is_featured")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_leads_agent_id" ON "leads" ("agent_id")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_users_role" ON "users" ("role")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_users_role"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_leads_agent_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_properties_is_featured"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_properties_agent_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_properties_type"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_properties_status"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_properties_approval_status"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_properties_city"`);
  }
}
