import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from '../users/user.entity'
import { SignupDto } from './dtos/signup.dto'
import { SigninDto } from './dtos/signin.dto'
import { AuthToken } from './types/AuthToken.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
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
    const [accessToken, refreshToken]: [string, string] = await Promise.all([
      // Access Token
      await this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
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
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        }
      ),
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  private async _hashRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<void> {
    const rtHash: string = await this._hashData(refreshToken)
    await this.userRepository.update({ id: userId }, { refreshToken: rtHash })
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
    const matched: boolean = await bcrypt.compare(
      signinDto.password,
      user.password
    )
    // Return 401 if password is incorrect
    if (!matched) {
      throw new UnauthorizedException('Access Denied')
    }

    const authToken: AuthToken = await this._getTokens(user.id, user.username)
    await this._hashRefreshToken(user.id, authToken.refresh_token)

    return authToken
  }

  async signOut(userId: number): Promise<boolean> {
    await this.userRepository.update(
      {
        id: userId,
      },
      {
        refreshToken: null,
      }
    )

    return true
  }

  async refreshToken(userId: number, refreshToken: string): Promise<AuthToken> {
    const user: User = await this.userRepository.findOneBy({ id: userId })
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Access Denied')
    }

    const matched = await bcrypt.compare(refreshToken, user.refreshToken)
    if (!matched) {
      throw new UnauthorizedException('Access Denied')
    }

    const authToken: AuthToken = await this._getTokens(user.id, user.username)
    await this._hashRefreshToken(user.id, authToken.refresh_token)

    return authToken
  }
}
