import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import LoginUserDto from 'src/auth/dto/auth.login.dto';
import RegisterUserDto from 'src/auth/dto/auth.register.dto';
import { AuthService } from './auth.service';
import { refreshTokenDto } from './dto/auth.refresh.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthTokens } from './classes/auth.tokens';
import { User } from 'src/user/user.entity';
import { LoggedUser } from './decorators/user.decorator';
import { UserService } from 'src/user/user.service';
import { UserPayload } from 'src/user/interfaces/user.payload.interface';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @Public()
  @HttpCode(200)
  @ApiOperation({
    description: 'Checks user credentials and signs JWT tokens',
  })
  @ApiOkResponse({
    description: 'Credentials are correct, response with tokens',
    type: AuthTokens,
  })
  @ApiUnauthorizedResponse({
    description: 'The user does not exist or password is incorrect',
  })
  @ApiBadRequestResponse({
    description: 'The request body was not in a correct format',
  })
  async login(@Body() credentials: LoginUserDto): Promise<AuthTokens> {
    return this.authService.login(credentials);
  }

  @Post('/refresh-token')
  @Public()
  @ApiOperation({
    description: 'Checks a refresh-token credentials and issues new JWT tokens',
  })
  @ApiOkResponse({
    description: 'Token is valid, response with new tokens',
    type: AuthTokens,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid',
  })
  @ApiBadRequestResponse({
    description: 'The request body was not in a correct format',
  })
  async refreshToken(
    @Body() { refreshToken: token }: refreshTokenDto,
  ): Promise<AuthTokens> {
    return this.authService.refreshToken(token);
  }

  @Post('/register')
  @Public()
  @ApiOperation({
    description: 'Registers a new user and issues new auth tokens',
  })
  @ApiCreatedResponse({
    description: 'User was created, response with new tokens',
    type: AuthTokens,
  })
  @ApiBadRequestResponse({
    description: 'The request body was not in a correct format',
  })
  async register(@Body() user: RegisterUserDto): Promise<AuthTokens> {
    return this.authService.register(user);
  }

  @Get('user') // just to test validation
  @UseGuards(LoginGuard)
  @ApiOkResponse({
    description: 'Returns current user',
    type: User,
  })
  @ApiUnauthorizedResponse({
    description: 'User not logged in',
  })
  async getCurrentUser(@LoggedUser() user: UserPayload): Promise<User> {
    return this.userService.findById(user.id);
  }
}
