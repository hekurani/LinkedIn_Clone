import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountUnseenConnections1717941200133 implements MigrationInterface {
    name = 'AddCountUnseenConnections1717941200133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."comment-reaction_reactiontype_enum" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'celebrate')`);
        await queryRunner.query(`CREATE TABLE "comment-reaction" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "reactionType" "public"."comment-reaction_reactiontype_enum" NOT NULL, "userId" integer, "commentId" integer, CONSTRAINT "PK_86c934ed6da30593feb2957bbfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."postreaction_reactiontype_enum" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry')`);
        await queryRunner.query(`CREATE TABLE "postreaction" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "reactionType" "public"."postreaction_reactiontype_enum" NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_cccfecce1e79638a0069038b8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reposts" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "userId" integer, "postsId" integer, CONSTRAINT "REL_d8f973ec285886ab4331780d4c" UNIQUE ("userId"), CONSTRAINT "REL_88651aa9949ad48c969dde5222" UNIQUE ("postsId"), CONSTRAINT "PK_52695faa15b7c703f8660581f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countUnseenConnections" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ADD CONSTRAINT "FK_a4c69e0effd88eb04203404cde0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ADD CONSTRAINT "FK_433de5dc0bce34c09bf171dc295" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "postreaction" ADD CONSTRAINT "FK_8869baf2d24afe437cd0e8608a0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "postreaction" ADD CONSTRAINT "FK_6ec6feb9c3c5c302e8970844dc5" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_d8f973ec285886ab4331780d4c6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_88651aa9949ad48c969dde5222a" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_88651aa9949ad48c969dde5222a"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_d8f973ec285886ab4331780d4c6"`);
        await queryRunner.query(`ALTER TABLE "postreaction" DROP CONSTRAINT "FK_6ec6feb9c3c5c302e8970844dc5"`);
        await queryRunner.query(`ALTER TABLE "postreaction" DROP CONSTRAINT "FK_8869baf2d24afe437cd0e8608a0"`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" DROP CONSTRAINT "FK_433de5dc0bce34c09bf171dc295"`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" DROP CONSTRAINT "FK_a4c69e0effd88eb04203404cde0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countUnseenConnections"`);
        await queryRunner.query(`DROP TABLE "reposts"`);
        await queryRunner.query(`DROP TABLE "postreaction"`);
        await queryRunner.query(`DROP TYPE "public"."postreaction_reactiontype_enum"`);
        await queryRunner.query(`DROP TABLE "comment-reaction"`);
        await queryRunner.query(`DROP TYPE "public"."comment-reaction_reactiontype_enum"`);
    }

}
