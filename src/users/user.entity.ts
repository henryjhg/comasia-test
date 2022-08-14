import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  username: string

  @Column({
    select: false,
  })
  password: string

  @Column({
    name: 'access_token',
    nullable: true,
  })
  accessToken: string

  @Column({
    name: 'refresh_token',
    nullable: true,
  })
  refreshToken: string

  @Column({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date
}
