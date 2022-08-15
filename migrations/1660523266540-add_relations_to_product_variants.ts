import { MigrationInterface, QueryRunner } from 'typeorm'

export class addRelationsToProductVariants1660523266540
  implements MigrationInterface
{
  name = 'addRelationsToProductVariants1660523266540'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_variant" ("id" SERIAL NOT NULL, "productId" integer, "colourId" integer, "capacityId" integer, CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD CONSTRAINT "FK_6e420052844edf3a5506d863ce6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD CONSTRAINT "FK_15299223e72adce4adeb8c6fee7" FOREIGN KEY ("colourId") REFERENCES "colour"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD CONSTRAINT "FK_ec84df3c22fe107483de53521ba" FOREIGN KEY ("capacityId") REFERENCES "capacity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP CONSTRAINT "FK_ec84df3c22fe107483de53521ba"`
    )
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP CONSTRAINT "FK_15299223e72adce4adeb8c6fee7"`
    )
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP CONSTRAINT "FK_6e420052844edf3a5506d863ce6"`
    )
    await queryRunner.query(`DROP TABLE "product_variant"`)
  }
}
