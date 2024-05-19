import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReposts1716138228539 implements MigrationInterface {
    name = 'CreateReposts1716138228539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reposts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "UQ_d8f973ec285886ab4331780d4c6" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD "postsId" integer`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "UQ_88651aa9949ad48c969dde5222a" UNIQUE ("postsId")`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_d8f973ec285886ab4331780d4c6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_88651aa9949ad48c969dde5222a" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_88651aa9949ad48c969dde5222a"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_d8f973ec285886ab4331780d4c6"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "UQ_88651aa9949ad48c969dde5222a"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP COLUMN "postsId"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "UQ_d8f973ec285886ab4331780d4c6"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP COLUMN "userId"`);
    }

}
