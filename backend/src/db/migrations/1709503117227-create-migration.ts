import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1709503117227 implements MigrationInterface {
    name = 'CreateMigration1709503117227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friends" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "status" character varying NOT NULL, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TABLE "friends"`);
    }

}
