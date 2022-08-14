import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @ApiProperty({ type: String, description: 'Username' })
  username: string

  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({
    type: String,
    description: 'Password',
    minLength: 8,
  })
  password: string
}
