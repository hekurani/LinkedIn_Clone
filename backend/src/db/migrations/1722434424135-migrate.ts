import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1722434424135 implements MigrationInterface {
    name = 'Migrate1722434424135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Follower" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "companyId" integer, "followerId" integer, CONSTRAINT "PK_e264ee4630ce34928b08646563b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Follower"`);
    }

}
