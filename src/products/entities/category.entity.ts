import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Product } from './product.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date

  @OneToMany(() => Product, (product: Product) => product.brand)
  products: Product[]
}
