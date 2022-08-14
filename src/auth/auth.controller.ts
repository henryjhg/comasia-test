import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { SignupDto } from './dtos/signup.dto'
import { SigninDto } from './dtos/signin.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'Successfully created a new user.' })
  @ApiBadRequestResponse({
    description: 'Creating a user with invalid inputs.',
  })
  @ApiBody({ type: SignupDto })
  async signUp(@Body() signupDto: SignupDto) {
    return await this.authService.signUp(signupDto)
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'Login with correct credentials' })
  @ApiUnauthorizedResponse({
    description: 'Login with incorrect or invalid credentials',
  })
  @ApiBody({ type: SigninDto })
  async signIn() {
    await this.authService.signIn()
  }

  @Post('/signout')
  async signOut() {
    await this.authService.signOut()
  }

  @Post('/refresh')
  async refresh() {
    await this.authService.refreshToken()
  }
}
