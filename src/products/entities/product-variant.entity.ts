import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Product } from './product.entity'
import { Colour } from './colour.entity'
import { Capacity } from './capacity.entity'

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product: Product) => product.variants)
  product: Product

  @ManyToOne(() => Colour, (colour: Colour) => colour.variants)
  colour: Colour

  @ManyToOne(() => Capacity, (capacity: Capacity) => capacity.variants)
  capacity: Capacity
}
