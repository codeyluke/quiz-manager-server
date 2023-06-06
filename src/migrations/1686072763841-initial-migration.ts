import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1686072763841 implements MigrationInterface {
  name = 'InitialMigration1686072763841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "quizes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL, CONSTRAINT "PK_2c6a29e4f537875fdef1f2e5881" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "quiz_id" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "options" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "is_correct" boolean NOT NULL, "question_id" integer, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "questions" ADD CONSTRAINT "FK_46b3c125e02f7242662e4ccb307" FOREIGN KEY ("quiz_id") REFERENCES "quizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "options" ADD CONSTRAINT "FK_2bdd03245b8cb040130fe16f21d" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "options" DROP CONSTRAINT "FK_2bdd03245b8cb040130fe16f21d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "questions" DROP CONSTRAINT "FK_46b3c125e02f7242662e4ccb307"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "options"`);
    await queryRunner.query(`DROP TABLE "questions"`);
    await queryRunner.query(`DROP TABLE "quizes"`);
  }
}
