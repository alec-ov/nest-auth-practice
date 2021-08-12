import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import LoginUserDto from 'src/user/dto/user.login.dto';
import RegisterUserDto from 'src/user/dto/user.register.dto';
import { AuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() credentials: LoginUserDto) {
    return this.authService.login(credentials);
  }

  @Post('/login-by-token')
  async loginByRefreshToken(@Body('refresh-token') token: string) {
    return this.authService.loginByRefreshToken(token);
  }

  @Post('/register')
  async register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }

  @Get('hidden')
  @UseGuards(LoginGuard)
  hidden() {
    return 'this is a private page';
  }
}
