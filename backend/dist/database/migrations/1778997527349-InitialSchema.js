"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1778997527349 = void 0;
class InitialSchema1778997527349 {
    name = 'InitialSchema1778997527349';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'agent', 'developer', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', "first_name" character varying, "last_name" character varying, "phone" character varying, "avatar_url" character varying, "is_verified" boolean NOT NULL DEFAULT false, "is_banned" boolean NOT NULL DEFAULT false, "refresh_token" character varying, "verification_token" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "property_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "property_id" uuid NOT NULL, "url" character varying NOT NULL, "public_id" character varying, "is_primary" boolean NOT NULL DEFAULT false, "display_order" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_317c3774ee70c26d70c4f80e200" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "property_amenities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "property_id" uuid NOT NULL, "amenity" character varying NOT NULL, CONSTRAINT "PK_ea41e688338a5af6b8eb12b213a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."properties_type_enum" AS ENUM('apartment', 'house', 'land', 'commercial', 'shortlet')`);
        await queryRunner.query(`CREATE TYPE "public"."properties_status_enum" AS ENUM('rent', 'sale')`);
        await queryRunner.query(`CREATE TYPE "public"."properties_approval_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" text NOT NULL, "type" "public"."properties_type_enum" NOT NULL, "price" numeric(15,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'NGN', "status" "public"."properties_status_enum" NOT NULL, "bedrooms" integer, "bathrooms" integer, "sqft" integer, "address" character varying NOT NULL, "city" character varying NOT NULL, "latitude" numeric(10,7), "longitude" numeric(10,7), "is_featured" boolean NOT NULL DEFAULT false, "approval_status" "public"."properties_approval_status_enum" NOT NULL DEFAULT 'pending', "rejection_reason" character varying, "agent_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_089e10e6f1282e7b4bd0c58263e" UNIQUE ("slug"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "saved_properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "property_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0297844fff2887d678839ae6d92" UNIQUE ("user_id", "property_id"), CONSTRAINT "PK_a2464e260f954bc376bd0d17ae9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."leads_type_enum" AS ENUM('inquiry', 'inspection')`);
        await queryRunner.query(`CREATE TABLE "leads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "property_id" uuid NOT NULL, "agent_id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "message" text, "type" "public"."leads_type_enum" NOT NULL DEFAULT 'inquiry', "preferred_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "content" text NOT NULL, "excerpt" text, "cover_image" character varying, "author_id" uuid NOT NULL, "published_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5b2818a2c45c3edb9991b1c7a51" UNIQUE ("slug"), CONSTRAINT "PK_dd2add25eac93daefc93da9d387" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."agents_tier_enum" AS ENUM('free', 'pro', 'premium')`);
        await queryRunner.query(`CREATE TABLE "agents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "agency_name" character varying, "bio" text, "whatsapp" character varying, "phone" character varying, "is_verified" boolean NOT NULL DEFAULT false, "tier" "public"."agents_tier_enum" NOT NULL DEFAULT 'free', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_57ee94c84a8e570e362af59dcea" UNIQUE ("user_id"), CONSTRAINT "REL_57ee94c84a8e570e362af59dce" UNIQUE ("user_id"), CONSTRAINT "PK_9c653f28ae19c5884d5baf6a1d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "property_images" ADD CONSTRAINT "FK_162a7701665354b4751ffb835e4" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property_amenities" ADD CONSTRAINT "FK_6002e49cdd5713b05fcd14e6d0a" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_c406123fe69e47e147b1b4cb030" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_properties" ADD CONSTRAINT "FK_fa159efc74565d76f573c13bace" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_properties" ADD CONSTRAINT "FK_3ee2fe01621de23dea020397628" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leads" ADD CONSTRAINT "FK_944e19e85c2bab99936ed423555" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_posts" ADD CONSTRAINT "FK_c3fc4a3a656aad74331acfcf2a9" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agents" ADD CONSTRAINT "FK_57ee94c84a8e570e362af59dcea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "agents" DROP CONSTRAINT "FK_57ee94c84a8e570e362af59dcea"`);
        await queryRunner.query(`ALTER TABLE "blog_posts" DROP CONSTRAINT "FK_c3fc4a3a656aad74331acfcf2a9"`);
        await queryRunner.query(`ALTER TABLE "leads" DROP CONSTRAINT "FK_944e19e85c2bab99936ed423555"`);
        await queryRunner.query(`ALTER TABLE "saved_properties" DROP CONSTRAINT "FK_3ee2fe01621de23dea020397628"`);
        await queryRunner.query(`ALTER TABLE "saved_properties" DROP CONSTRAINT "FK_fa159efc74565d76f573c13bace"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_c406123fe69e47e147b1b4cb030"`);
        await queryRunner.query(`ALTER TABLE "property_amenities" DROP CONSTRAINT "FK_6002e49cdd5713b05fcd14e6d0a"`);
        await queryRunner.query(`ALTER TABLE "property_images" DROP CONSTRAINT "FK_162a7701665354b4751ffb835e4"`);
        await queryRunner.query(`DROP TABLE "agents"`);
        await queryRunner.query(`DROP TYPE "public"."agents_tier_enum"`);
        await queryRunner.query(`DROP TABLE "blog_posts"`);
        await queryRunner.query(`DROP TABLE "leads"`);
        await queryRunner.query(`DROP TYPE "public"."leads_type_enum"`);
        await queryRunner.query(`DROP TABLE "saved_properties"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TYPE "public"."properties_approval_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."properties_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."properties_type_enum"`);
        await queryRunner.query(`DROP TABLE "property_amenities"`);
        await queryRunner.query(`DROP TABLE "property_images"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
exports.InitialSchema1778997527349 = InitialSchema1778997527349;
//# sourceMappingURL=1778997527349-InitialSchema.js.map