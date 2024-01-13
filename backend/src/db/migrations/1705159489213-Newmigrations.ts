import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigrations1705159489213 implements MigrationInterface {
    name = 'Newmigrations1705159489213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_room" ADD "boni" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_room" DROP COLUMN "boni"`);
    }

}
