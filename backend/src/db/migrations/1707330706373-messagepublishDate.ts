import { MigrationInterface, QueryRunner } from "typeorm";

export class MessagepublishDate1707330706373 implements MigrationInterface {
    name = 'MessagepublishDate1707330706373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME COLUMN "createdAt" TO "publishDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME COLUMN "publishDate" TO "createdAt"`);
    }

}
