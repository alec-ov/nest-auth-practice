import { Controller, Get } from '@nestjs/common';
import IUser from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }
}
