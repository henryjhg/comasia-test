import { MigrationInterface, QueryRunner } from 'typeorm'

export class createCapacityTable1660521837721 implements MigrationInterface {
  name = 'createCapacityTable1660521837721'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "capacity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_469510b62da4bcc225eb3c01286" UNIQUE ("name"), CONSTRAINT "PK_c87ed22152323f83d46ad2c78bb" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "capacity"`)
  }
}
