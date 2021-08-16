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

  @Post('/refresh-token')
  async refreshToken(@Body('refresh-token') token: string) {
    return this.authService.refreshToken(token);
  }

  @Post('/register')
  async register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }

  @Get('hidden') // just to test validation
  @UseGuards(LoginGuard)
  hidden() {
    return 'this is a private page';
  }
}
