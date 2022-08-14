import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Brand {
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
}
