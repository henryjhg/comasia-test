import { MigrationInterface, QueryRunner } from 'typeorm'

export class addCreatedAtColumnToUser1660447820181
  implements MigrationInterface
{
  name = 'addCreatedAtColumnToUser1660447820181'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`)
  }
}
