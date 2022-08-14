import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { User } from '../users/user.entity'
import { SignupDto } from './dtos/signup.dto'
import { SigninDto } from './dtos/signin.dto'
import { AuthToken } from './types/AuthToken'
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
  @ApiOkResponse({ description: 'Login with correct credentials' })
  @ApiUnauthorizedResponse({
    description: 'Login with incorrect or invalid credentials',
  })
  @ApiBody({ type: SigninDto })
  async signIn(@Body() signinDto: SigninDto): Promise<AuthToken> {
    return await this.authService.signIn(signinDto)
  }

  // TODO: Lock API
  @Post('/signout')
  async signOut() {
    await this.authService.signOut()
  }

  // TODO: Lock API
  @Post('/refresh')
  async refresh() {
    await this.authService.refreshToken()
  }
}
