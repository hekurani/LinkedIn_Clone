import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1712088515298 implements MigrationInterface {
    name = 'Update1712088515298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updatedAt" SET NOT NULL`);
    }

}
