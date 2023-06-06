import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTextToQuizTable1686074111088 implements MigrationInterface {
  name = 'AddTextToQuizTable1686074111088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quizes" ADD "text" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quizes" DROP COLUMN "text"`);
  }
}
