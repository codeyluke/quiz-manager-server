import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToUser1686161033011 implements MigrationInterface {
  name = 'AddNameToUser1686161033011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
