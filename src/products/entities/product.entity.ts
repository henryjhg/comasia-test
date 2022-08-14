import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../users/user.entity'

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
}
