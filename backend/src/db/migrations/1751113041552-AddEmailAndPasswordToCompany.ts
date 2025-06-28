import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailAndPasswordToCompany1751113041552 implements MigrationInterface {
    name = 'AddEmailAndPasswordToCompany1751113041552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "company" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "email"`);
    }

}
