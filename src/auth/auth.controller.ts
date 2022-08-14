import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Request } from 'express'

import { User } from '../users/user.entity'
import { SignupDto } from './dtos/signup.dto'
import { SigninDto } from './dtos/signin.dto'
import { AuthToken } from './types/AuthToken.type'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'Successfully created a new user.' })
  @ApiBadRequestResponse({
    description: 'Creating a user with invalid inputs.',
  })
  @ApiBody({ type: SignupDto })
  async signUp(@Body() signupDto: SignupDto): Promise<User> {
    return await this.authService.signUp(signupDto)
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Login with correct credentials' })
  @ApiUnauthorizedResponse({
    description: 'Login with incorrect or invalid credentials',
  })
  @ApiBody({ type: SigninDto })
  async signIn(@Body() signinDto: SigninDto): Promise<AuthToken> {
    return await this.authService.signIn(signinDto)
  }

  @UseGuards(AuthGuard('at-jwt'))
  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() req: Request): Promise<boolean> {
    const user = req.user
    return await this.authService.signOut(user['sub'])
  }

  @UseGuards(AuthGuard('rt-jwt'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh() {
    await this.authService.refreshToken()
  }
}
