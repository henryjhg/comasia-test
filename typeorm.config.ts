import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'

import { createUserTable1660407498957 } from './migrations/1660407498957-create_user_table'
import { User } from './src/users/user.entity'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [User],
  migrations: [createUserTable1660407498957],
})
