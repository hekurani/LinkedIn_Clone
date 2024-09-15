import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1726409568627 implements MigrationInterface {
    name = 'CreateEntities1726409568627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reposts" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "userId" integer, "postsId" integer, CONSTRAINT "REL_d8f973ec285886ab4331780d4c" UNIQUE ("userId"), CONSTRAINT "REL_88651aa9949ad48c969dde5222" UNIQUE ("postsId"), CONSTRAINT "PK_52695faa15b7c703f8660581f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_d8f973ec285886ab4331780d4c6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_88651aa9949ad48c969dde5222a" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_88651aa9949ad48c969dde5222a"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_d8f973ec285886ab4331780d4c6"`);
        await queryRunner.query(`DROP TABLE "reposts"`);
    }

}
