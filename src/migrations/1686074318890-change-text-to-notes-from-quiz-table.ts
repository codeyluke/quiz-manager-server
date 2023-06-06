import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTextToNotesFromQuizTable1686074318890
  implements MigrationInterface
{
  name = 'ChangeTextToNotesFromQuizTable1686074318890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quizes" RENAME COLUMN "text" TO "notes"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quizes" RENAME COLUMN "notes" TO "text"`,
    );
  }
}
