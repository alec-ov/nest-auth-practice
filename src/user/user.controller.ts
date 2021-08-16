import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/auth/guards/login.guard';
import IUser from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(LoginGuard)
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }
}
