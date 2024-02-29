import { MigrationInterface, QueryRunner } from "typeorm";

export class User1and2ChatRoom1708879166539 implements MigrationInterface {
    name = 'User1and2ChatRoom1708879166539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_room" ADD "user1Id" integer`);
        await queryRunner.query(`ALTER TABLE "chat_room" ADD "user2Id" integer`);
        await queryRunner.query(`ALTER TABLE "chat_room" ADD CONSTRAINT "FK_d70af5860ea52decb9278da7e8d" FOREIGN KEY ("user1Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_room" ADD CONSTRAINT "FK_4f59db9140b4d4d1f58618c2657" FOREIGN KEY ("user2Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_room" DROP CONSTRAINT "FK_4f59db9140b4d4d1f58618c2657"`);
        await queryRunner.query(`ALTER TABLE "chat_room" DROP CONSTRAINT "FK_d70af5860ea52decb9278da7e8d"`);
        await queryRunner.query(`ALTER TABLE "chat_room" DROP COLUMN "user2Id"`);
        await queryRunner.query(`ALTER TABLE "chat_room" DROP COLUMN "user1Id"`);
    }

}
