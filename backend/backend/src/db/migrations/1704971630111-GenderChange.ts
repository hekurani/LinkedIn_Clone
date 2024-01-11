import { MigrationInterface, QueryRunner } from "typeorm";

export class GenderChange1704971630111 implements MigrationInterface {
    name = 'GenderChange1704971630111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
    }

}
