import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1722368259163 implements MigrationInterface {
    name = 'Migrate1722368259163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "cityIdId" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_7cac5d6351cf570681b7dddaabb" UNIQUE ("cityIdId")`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "UQ_f9c25d6ae5734b405b890d0ee52" UNIQUE ("country")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_7cac5d6351cf570681b7dddaabb" FOREIGN KEY ("cityIdId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_7cac5d6351cf570681b7dddaabb"`);
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "UQ_f9c25d6ae5734b405b890d0ee52"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_7cac5d6351cf570681b7dddaabb"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "cityIdId"`);
    }

}
