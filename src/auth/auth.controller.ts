import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { CurrentUser } from '../_decorators/current-user.decorator'
import { Public } from '../_decorators/public.decorator'
import { RefreshTokenGuard } from '../_guards/refresh-token.guard'
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
  @Public()
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
  @Public()
  @ApiOkResponse({ description: 'Login with correct credentials' })
  @ApiUnauthorizedResponse({
    description: 'Login with incorrect or invalid credentials',
  })
  @ApiBody({ type: SigninDto })
  async signIn(@Body() signinDto: SigninDto): Promise<AuthToken> {
    return await this.authService.signIn(signinDto)
  }

  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  @ApiUnauthorizedResponse({ description: '' })
  async signOut(@CurrentUser('sub') userId: number): Promise<boolean> {
    return await this.authService.signOut(userId)
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOkResponse({ description: '' })
  @ApiUnauthorizedResponse({ description: '' })
  async refresh(
    @CurrentUser('sub') userId: number,
    @CurrentUser('refresh_token') refreshToken: string
  ): Promise<AuthToken> {
    return await this.authService.refreshToken(userId, refreshToken)
  }
}
