import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'

import { User } from './src/auth/entities/user.entity'
import { Category } from './src/products/entities/category.entity'
import { Brand } from './src/products/entities/brand.entity'
import { Product } from './src/products/entities/product.entity'
import { Colour } from './src/products/entities/colour.entity'
import { Capacity } from './src/products/entities/capacity.entity'
import { ProductVariant } from './src/products/entities/product-variant.entity'

import { createUserTable1660407498957 } from './migrations/1660407498957-create_user_table'
import { addCreatedAtColumnToUser1660447820181 } from './migrations/1660447820181-add_createdAt_column_to_user'
import { createCategoryTable1660490028613 } from './migrations/1660490028613-create_category_table'
import { createBrandTable1660491671327 } from './migrations/1660491671327-create_brand_table'
import { createProductTable1660493679075 } from './migrations/1660493679075-create_product_table'
import { addFkConstraintsToProduct1660495233597 } from './migrations/1660495233597-add_fk_constraints_to_product'
import { createColourTable1660521763469 } from './migrations/1660521763469-create_colour_table'
import { createCapacityTable1660521837721 } from './migrations/1660521837721-create_capacity_table'
import { addRelationsToProductVariants1660523266540 } from './migrations/1660523266540-add_relations_to_product_variants'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [User, Category, Brand, Product, Colour, Capacity, ProductVariant],
  migrations: [
    createUserTable1660407498957,
    addCreatedAtColumnToUser1660447820181,
    createCategoryTable1660490028613,
    createBrandTable1660491671327,
    createProductTable1660493679075,
    addFkConstraintsToProduct1660495233597,
    createColourTable1660521763469,
    createCapacityTable1660521837721,
    addRelationsToProductVariants1660523266540,
  ],
})
