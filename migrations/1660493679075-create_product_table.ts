import { MigrationInterface, QueryRunner } from 'typeorm'

export class createProductTable1660493679075 implements MigrationInterface {
  name = 'createProductTable1660493679075'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, CONSTRAINT "UQ_f7bf944ad9f1034110e8c2133ab" UNIQUE ("title"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b5effca691499d21c5ec683ced6" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b5effca691499d21c5ec683ced6"`
    )
    await queryRunner.query(`DROP TABLE "product"`)
  }
}
