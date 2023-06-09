import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUser1686294261449 implements MigrationInterface {
    name = 'AddRefreshTokenToUser1686294261449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
    }

}
