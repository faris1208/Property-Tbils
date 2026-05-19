"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResetPasswordToken1779300000000 = void 0;
class AddResetPasswordToken1779300000000 {
    name = 'AddResetPasswordToken1779300000000';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_token" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "reset_password_token"`);
    }
}
exports.AddResetPasswordToken1779300000000 = AddResetPasswordToken1779300000000;
//# sourceMappingURL=1779300000000-AddResetPasswordToken.js.map