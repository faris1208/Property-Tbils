"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscribers1779100000000 = void 0;
class CreateSubscribers1779100000000 {
    name = 'CreateSubscribers1779100000000';
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "subscribers"`);
    }
}
exports.CreateSubscribers1779100000000 = CreateSubscribers1779100000000;
//# sourceMappingURL=1779100000000-CreateSubscribers.js.map