import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport'
import { ExtractJwt } from 'passport-jwt'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'at-jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    })
  }

  validate(payload) {
    return payload
  }
}
