import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostReaction1716123562328 implements MigrationInterface {
    name = 'UpdatePostReaction1716123562328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."postreaction_reactiontype_enum" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry')`);
        await queryRunner.query(`CREATE TABLE "postreaction" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "reactionType" "public"."postreaction_reactiontype_enum" NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_cccfecce1e79638a0069038b8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "postreaction" ADD CONSTRAINT "FK_8869baf2d24afe437cd0e8608a0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "postreaction" ADD CONSTRAINT "FK_6ec6feb9c3c5c302e8970844dc5" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "postreaction" DROP CONSTRAINT "FK_6ec6feb9c3c5c302e8970844dc5"`);
        await queryRunner.query(`ALTER TABLE "postreaction" DROP CONSTRAINT "FK_8869baf2d24afe437cd0e8608a0"`);
        await queryRunner.query(`DROP TABLE "postreaction"`);
        await queryRunner.query(`DROP TYPE "public"."postreaction_reactiontype_enum"`);
    }

}
