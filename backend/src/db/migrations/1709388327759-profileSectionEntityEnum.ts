import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileSectionEntityEnum1709388327759 implements MigrationInterface {
    name = 'ProfileSectionEntityEnum1709388327759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_section" ALTER COLUMN "priority" SET DEFAULT 'additional'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_section" ALTER COLUMN "priority" SET DEFAULT 'core'`);
    }

}
