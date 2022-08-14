import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'

import { createUserTable1660407498957 } from './migrations/1660407498957-create_user_table'
import { addCreatedAtColumnToUser1660447820181 } from './migrations/1660447820181-add_createdAt_column_to_user'
import { createCategoryTable1660490028613 } from './migrations/1660490028613-create_category_table'
import { User } from './src/users/user.entity'
import { Category } from './src/categories/category.entity'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [User, Category],
  migrations: [
    createUserTable1660407498957,
    addCreatedAtColumnToUser1660447820181,
    createCategoryTable1660490028613,
  ],
})
