import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedProfessions1749897822175 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "profession" ("name") VALUES
            ('Software Engineer'),
            ('Software Developer'),
            ('Mobile App Developer'),
            ('Web Developer')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "profession" 
            WHERE "name" IN (
                'Software Engineer',
                'Software Developer',
                'Mobile App Developer',
                'Web Developer'
            )
        `);
    }
} 