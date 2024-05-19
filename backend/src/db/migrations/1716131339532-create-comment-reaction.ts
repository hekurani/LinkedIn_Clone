import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentReaction1716131339532 implements MigrationInterface {
    name = 'CreateCommentReaction1716131339532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."comment-reaction_reactiontype_enum" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry')`);
        await queryRunner.query(`CREATE TABLE "comment-reaction" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "reactionType" "public"."comment-reaction_reactiontype_enum" NOT NULL, "userId" integer, "commentId" integer, CONSTRAINT "PK_86c934ed6da30593feb2957bbfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ADD CONSTRAINT "FK_a4c69e0effd88eb04203404cde0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ADD CONSTRAINT "FK_433de5dc0bce34c09bf171dc295" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment-reaction" DROP CONSTRAINT "FK_433de5dc0bce34c09bf171dc295"`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" DROP CONSTRAINT "FK_a4c69e0effd88eb04203404cde0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`DROP TABLE "comment-reaction"`);
        await queryRunner.query(`DROP TYPE "public"."comment-reaction_reactiontype_enum"`);
    }

}
