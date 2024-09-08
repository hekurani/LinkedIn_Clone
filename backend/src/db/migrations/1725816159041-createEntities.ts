import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1725816159041 implements MigrationInterface {
    name = 'CreateEntities1725816159041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job-post" ADD "locationId" integer`);
        await queryRunner.query(`ALTER TABLE "job-post" ADD CONSTRAINT "FK_eb6bf9379797220bcacc97a55c7" FOREIGN KEY ("locationId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job-post" DROP CONSTRAINT "FK_eb6bf9379797220bcacc97a55c7"`);
        await queryRunner.query(`ALTER TABLE "job-post" DROP COLUMN "locationId"`);
    }

}
