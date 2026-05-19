"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIndexes1779200000000 = void 0;
class AddIndexes1779200000000 {
    name = 'AddIndexes1779200000000';
    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_city" ON "properties" ("city")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_approval_status" ON "properties" ("approval_status")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_status" ON "properties" ("status")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_type" ON "properties" ("type")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_agent_id" ON "properties" ("agent_id")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_properties_is_featured" ON "properties" ("is_featured")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_leads_agent_id" ON "leads" ("agent_id")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_users_role" ON "users" ("role")`);
    }
    async down(queryRunner) {
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
exports.AddIndexes1779200000000 = AddIndexes1779200000000;
//# sourceMappingURL=1779200000000-AddIndexes.js.map