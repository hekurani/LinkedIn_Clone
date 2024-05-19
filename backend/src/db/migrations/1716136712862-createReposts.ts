import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReposts1716136712862 implements MigrationInterface {
    name = 'CreateReposts1716136712862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reposts" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, CONSTRAINT "PK_52695faa15b7c703f8660581f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."comment-reaction_reactiontype_enum" RENAME TO "comment-reaction_reactiontype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."comment-reaction_reactiontype_enum" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'celebrate')`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ALTER COLUMN "reactionType" TYPE "public"."comment-reaction_reactiontype_enum" USING "reactionType"::"text"::"public"."comment-reaction_reactiontype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."comment-reaction_reactiontype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."comment-reaction_reactiontype_enum_old" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry')`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ALTER COLUMN "reactionType" TYPE "public"."comment-reaction_reactiontype_enum_old" USING "reactionType"::"text"::"public"."comment-reaction_reactiontype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."comment-reaction_reactiontype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."comment-reaction_reactiontype_enum_old" RENAME TO "comment-reaction_reactiontype_enum"`);
        await queryRunner.query(`DROP TABLE "reposts"`);
    }

}
