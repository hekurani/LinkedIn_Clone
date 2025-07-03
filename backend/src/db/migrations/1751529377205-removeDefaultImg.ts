import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDefaultImg1751529377205 implements MigrationInterface {
    name = 'RemoveDefaultImg1751529377205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "imageProfile" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "imageProfile" SET DEFAULT 'profile.png'`);
    }

}
