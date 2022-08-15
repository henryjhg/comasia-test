import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ProductVariant } from './product-variant.entity'

@Entity()
export class Capacity {
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

  @OneToMany(() => ProductVariant, variant => variant.colour)
  variants: ProductVariant[]
}
