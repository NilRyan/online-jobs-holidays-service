import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHolidays1590521920199 implements MigrationInterface {
  name = 'CreateHolidays1590521920199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "holidays" ("id" SERIAL NOT NULL, "holiday_code" character varying(100), "user_id" character varying(255), "date" character varying(255), "start" character varying(255), "end" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_Holiday" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "holidays"`, undefined);
  }
}
