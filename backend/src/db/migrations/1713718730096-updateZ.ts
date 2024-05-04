import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateZ1713718730096 implements MigrationInterface {
    name = 'UpdateZ1713718730096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "publishDate" TIMESTAMP NOT NULL DEFAULT now(), "editedAt" TIMESTAMP NOT NULL, "userId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friends" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "status" character varying NOT NULL, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_skills_skill" ("userId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_972b9abaae51dbb33e482d81a26" PRIMARY KEY ("userId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5cce6242aae7bce521a76a3be" ON "user_skills_skill" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7e4f0b8d58a56f71dd097d754" ON "user_skills_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "parentCommentId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "imageProfile" SET DEFAULT 'profile.png'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat_room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_b5cce6242aae7bce521a76a3be1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_c7e4f0b8d58a56f71dd097d7546" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_c7e4f0b8d58a56f71dd097d7546"`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_b5cce6242aae7bce521a76a3be1"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "imageProfile" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "parentCommentId"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "skills" text NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7e4f0b8d58a56f71dd097d754"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5cce6242aae7bce521a76a3be"`);
        await queryRunner.query(`DROP TABLE "user_skills_skill"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TABLE "friends"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
