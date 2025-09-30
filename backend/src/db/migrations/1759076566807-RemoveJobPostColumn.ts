import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveJobPostColumn1759076566807 implements MigrationInterface {
    name = 'RemoveJobPostColumn1759076566807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "jobPostsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" ADD "jobPostsId" integer`);
    }

}
