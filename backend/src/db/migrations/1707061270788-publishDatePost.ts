import { MigrationInterface, QueryRunner } from "typeorm";

export class PublishDatePost1707061270788 implements MigrationInterface {
    name = 'PublishDatePost1707061270788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "publishDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "publishDate" DROP DEFAULT`);
    }

}
