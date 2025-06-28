import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfessionTable1749897822174 implements MigrationInterface {
    name = 'AddProfessionTable1749897822174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profession" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_3113ca18873244db8aac3441ae6" UNIQUE ("name"), CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "professionId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "professionId"`);
        await queryRunner.query(`DROP TABLE "profession"`);
    }

}
