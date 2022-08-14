import { MigrationInterface, QueryRunner } from 'typeorm'

export class addFkConstraintsToProduct1660495233597
  implements MigrationInterface
{
  name = 'addFkConstraintsToProduct1660495233597'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`)
    await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`)
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`
    )
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`
    )
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`)
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`)
  }
}
