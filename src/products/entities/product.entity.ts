import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../auth/entities/user.entity'
import { Brand } from './brand.entity'
import { Category } from './category.entity'
import { ProductVariant } from './product-variant.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  title: string

  @Column()
  price: number

  @Column({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date

  @ManyToOne(() => User, {})
  @JoinColumn({ name: 'created_by' })
  createdBy: User

  @ManyToOne(() => Brand, (brand: Brand) => brand.products)
  brand: Brand

  @ManyToOne(() => Category, (category: Category) => category.products)
  category: Category

  @OneToMany(() => ProductVariant, (variant: ProductVariant) => variant.product)
  variants: ProductVariant[]
}
