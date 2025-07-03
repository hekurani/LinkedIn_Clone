import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupOnMacDevice1751475525897 implements MigrationInterface {
    name = 'SetupOnMacDevice1751475525897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."comment-reaction_reactiontype_enum" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'celebrate')`);
        await queryRunner.query(`CREATE TABLE "comment-reaction" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "reactionType" "public"."comment-reaction_reactiontype_enum" NOT NULL, "userId" integer, "commentId" integer, CONSTRAINT "PK_86c934ed6da30593feb2957bbfa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "publishDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "userId" integer, "postId" integer, "parentCommentId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."postreaction_reactiontype_enum" AS ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry')`);
        await queryRunner.query(`CREATE TABLE "postreaction" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "reactionType" "public"."postreaction_reactiontype_enum" NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_cccfecce1e79638a0069038b8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reposts" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "userId" integer, "postsId" integer, CONSTRAINT "REL_d8f973ec285886ab4331780d4c" UNIQUE ("userId"), CONSTRAINT "REL_88651aa9949ad48c969dde5222" UNIQUE ("postsId"), CONSTRAINT "PK_52695faa15b7c703f8660581f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "publishDate" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "postImages" text NOT NULL, "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, CONSTRAINT "UQ_f9c25d6ae5734b405b890d0ee52" UNIQUE ("country"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "city" character varying NOT NULL, "countryId" integer, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."company_industry_type_enum" AS ENUM('Technology', 'Finance', 'Healthcare', 'Education')`);
        await queryRunner.query(`CREATE TYPE "public"."company_workplace_enum" AS ENUM('Hybrid', 'Remote', 'On-site')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "industry_type" "public"."company_industry_type_enum" NOT NULL, "Specalities" text, "tagLine" character varying, "logo" character varying NOT NULL DEFAULT 'logo.png', "imageCover" character varying NOT NULL DEFAULT 'imageCover.png', "url" character varying, "phone_number" character varying NOT NULL, "yearFounded" character varying NOT NULL, "workPlace" "public"."company_workplace_enum", "hashTags" text, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "cityIdId" integer, "ownerId" integer, CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "UQ_47216baa0f0c8ebc6ee5a74989c" UNIQUE ("slug"), CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."job-post_workplace_enum" AS ENUM('Hybrid', 'Remote', 'On-site')`);
        await queryRunner.query(`CREATE TABLE "job-post" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "description" character varying NOT NULL, "minSalary" integer, "maxSalary" integer, "redirectURL" character varying, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "workPlace" "public"."job-post_workplace_enum", "deadLine" date NOT NULL DEFAULT now(), "companyId" integer, "supervisorId" integer, "locationId" integer, CONSTRAINT "PK_19c6a7e604f32663d470210610b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "jobPostsId" integer, CONSTRAINT "UQ_0f49a593960360f6f85b692aca8" UNIQUE ("name"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profession" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_3113ca18873244db8aac3441ae6" UNIQUE ("name"), CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "countUnseenConnections" integer NOT NULL DEFAULT '0', "roleId" integer NOT NULL, "password" character varying, "RefreshToken" character varying, "imageProfile" character varying DEFAULT 'profile.png', "gender" character varying, "professionId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_room" ("id" SERIAL NOT NULL, "messages" text NOT NULL DEFAULT '[]', "user1Id" integer, "user2Id" integer, CONSTRAINT "PK_8aa3a52cf74c96469f0ef9fbe3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "publishDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friends" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "status" character varying NOT NULL, "senderId" integer, "receiverId" integer, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Follower" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "companyId" integer, "followerId" integer, CONSTRAINT "PK_e264ee4630ce34928b08646563b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "WorkExperience" ("id" SERIAL NOT NULL, "startDate" date NOT NULL DEFAULT now(), "endDate" date DEFAULT now(), "companyId" integer, "employerId" integer, CONSTRAINT "PK_a879ca1f01a394c612b1171db63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jobapplication" ("id" SERIAL NOT NULL, "aplication" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT ('now'::text)::date, "applicantId" integer, "jobPostId" integer, CONSTRAINT "PK_6136f79eaed3e932dad0b58b3e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_skills_skill" ("userId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_972b9abaae51dbb33e482d81a26" PRIMARY KEY ("userId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5cce6242aae7bce521a76a3be" ON "user_skills_skill" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7e4f0b8d58a56f71dd097d754" ON "user_skills_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ADD CONSTRAINT "FK_a4c69e0effd88eb04203404cde0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" ADD CONSTRAINT "FK_433de5dc0bce34c09bf171dc295" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "postreaction" ADD CONSTRAINT "FK_8869baf2d24afe437cd0e8608a0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "postreaction" ADD CONSTRAINT "FK_6ec6feb9c3c5c302e8970844dc5" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_d8f973ec285886ab4331780d4c6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reposts" ADD CONSTRAINT "FK_88651aa9949ad48c969dde5222a" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_7cac5d6351cf570681b7dddaabb" FOREIGN KEY ("cityIdId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_ee87438803acb531639e8284be0" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job-post" ADD CONSTRAINT "FK_eb6bf9379797220bcacc97a55c7" FOREIGN KEY ("locationId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_room" ADD CONSTRAINT "FK_d70af5860ea52decb9278da7e8d" FOREIGN KEY ("user1Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_room" ADD CONSTRAINT "FK_4f59db9140b4d4d1f58618c2657" FOREIGN KEY ("user2Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat_room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_b5cce6242aae7bce521a76a3be1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_c7e4f0b8d58a56f71dd097d7546" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_c7e4f0b8d58a56f71dd097d7546"`);
        await queryRunner.query(`ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_b5cce6242aae7bce521a76a3be1"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "chat_room" DROP CONSTRAINT "FK_4f59db9140b4d4d1f58618c2657"`);
        await queryRunner.query(`ALTER TABLE "chat_room" DROP CONSTRAINT "FK_d70af5860ea52decb9278da7e8d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f2831fa0e27b0cbca51bbce803d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "job-post" DROP CONSTRAINT "FK_eb6bf9379797220bcacc97a55c7"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_ee87438803acb531639e8284be0"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_7cac5d6351cf570681b7dddaabb"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_88651aa9949ad48c969dde5222a"`);
        await queryRunner.query(`ALTER TABLE "reposts" DROP CONSTRAINT "FK_d8f973ec285886ab4331780d4c6"`);
        await queryRunner.query(`ALTER TABLE "postreaction" DROP CONSTRAINT "FK_6ec6feb9c3c5c302e8970844dc5"`);
        await queryRunner.query(`ALTER TABLE "postreaction" DROP CONSTRAINT "FK_8869baf2d24afe437cd0e8608a0"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" DROP CONSTRAINT "FK_433de5dc0bce34c09bf171dc295"`);
        await queryRunner.query(`ALTER TABLE "comment-reaction" DROP CONSTRAINT "FK_a4c69e0effd88eb04203404cde0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7e4f0b8d58a56f71dd097d754"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5cce6242aae7bce521a76a3be"`);
        await queryRunner.query(`DROP TABLE "user_skills_skill"`);
        await queryRunner.query(`DROP TABLE "jobapplication"`);
        await queryRunner.query(`DROP TABLE "WorkExperience"`);
        await queryRunner.query(`DROP TABLE "Follower"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TABLE "friends"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "chat_room"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profession"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "job-post"`);
        await queryRunner.query(`DROP TYPE "public"."job-post_workplace_enum"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "public"."company_workplace_enum"`);
        await queryRunner.query(`DROP TYPE "public"."company_industry_type_enum"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "reposts"`);
        await queryRunner.query(`DROP TABLE "postreaction"`);
        await queryRunner.query(`DROP TYPE "public"."postreaction_reactiontype_enum"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "comment-reaction"`);
        await queryRunner.query(`DROP TYPE "public"."comment-reaction_reactiontype_enum"`);
    }

}
