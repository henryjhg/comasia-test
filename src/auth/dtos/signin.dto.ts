import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SigninDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @ApiProperty({ type: String, description: 'Username' })
  username: string

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ type: String, description: 'Username' })
  password: string
}
