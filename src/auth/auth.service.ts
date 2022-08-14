import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from '../users/user.entity'
import { SignupDto } from './dtos/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async signUp(signupDto: SignupDto): Promise<User> {
    const user: User = new User()
    user.username = signupDto.username
    user.password = await bcrypt.hash(signupDto.password, 12)

    return this.userRepository.save(user)
  }

  async signIn() {}

  async signOut() {}

  async refreshToken() {}
}
