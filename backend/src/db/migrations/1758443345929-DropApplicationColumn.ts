import { MigrationInterface, QueryRunner } from "typeorm";

export class DropApplicationColumn1758443345929 implements MigrationInterface {
    name = 'DropApplicationColumn1758443345929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobapplication" DROP COLUMN "aplication"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobapplication" ADD "aplication" character varying NOT NULL`);
    }

}
