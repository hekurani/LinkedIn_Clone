import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageAndComment1711450920992 implements MigrationInterface {
    name = 'UpdateMessageAndComment1711450920992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "edited_comment" ("id" SERIAL NOT NULL, "editedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_85f0453939318aa08ebb840b2b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deleted_message" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_ec6eeb89838fd893d34df37b023" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "edited_message" ("id" SERIAL NOT NULL, "editedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_2eb01fbec0f1f32da8eb82df269" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "edited_message"`);
        await queryRunner.query(`DROP TABLE "deleted_message"`);
        await queryRunner.query(`DROP TABLE "edited_comment"`);
    }

}
