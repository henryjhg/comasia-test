import { MigrationInterface, QueryRunner } from 'typeorm'

export class createColourTable1660521763469 implements MigrationInterface {
  name = 'createColourTable1660521763469'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "colour" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4fd60ac91c418aae1513ab2982a" UNIQUE ("name"), CONSTRAINT "PK_04e2f7f25e4de91d3b0ec96443d" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "colour"`)
  }
}
