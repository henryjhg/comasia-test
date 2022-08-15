import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Colour {
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
