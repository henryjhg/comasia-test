import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport'
import { ExtractJwt } from 'passport-jwt'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
    })
  }

  validate(req: Request, payload) {
    const token = req.get('authorization').replace('Bearer', '').trim()

    return {
      ...payload,
      token,
    }
  }
}
