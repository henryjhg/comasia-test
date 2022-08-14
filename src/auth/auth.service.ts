import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from '../users/user.entity'
import { SignupDto } from './dtos/signup.dto'
import { SigninDto } from './dtos/signin.dto'
import { AuthToken } from './types/AuthToken'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  private async _hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 12)
  }

  private async _getTokens(
    userId: number,
    username: string
  ): Promise<AuthToken> {
    const [accessToken, refreshToken] = await Promise.all([
      // Access Token
      await this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: 'at-secret',
          expiresIn: '15m',
        }
      ),
      //Refresh Token
      await this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: 'rt-secret',
          expiresIn: '7d',
        }
      ),
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  private async _hashRefreshToken(userId: number, refreshToken: string) {
    const rtHash = await this._hashData(refreshToken)

    return await this.userRepository.update(
      { id: userId },
      { refreshToken: rtHash }
    )
  }

  async signUp(signupDto: SignupDto): Promise<User> {
    const user: User = new User()
    user.username = signupDto.username
    user.password = await this._hashData(signupDto.password)

    return this.userRepository.save(user)
  }

  async signIn(signinDto: SigninDto): Promise<AuthToken> {
    // Find user by username
    const user = await this.userRepository.findOneBy({
      username: signinDto.username,
    })
    // Return 401 if not user found
    if (!user) {
      throw new UnauthorizedException('Access Denied')
    }

    // Compare password
    const matched = await bcrypt.compare(signinDto.password, user.password)
    // Return 401 if password is incorrect
    if (!matched) {
      throw new UnauthorizedException('Access Denied')
    }

    const authToken: AuthToken = await this._getTokens(user.id, user.username)
    await this._hashRefreshToken(user.id, authToken.refresh_token)

    return authToken
  }

  async signOut() {}

  async refreshToken() {}
}
