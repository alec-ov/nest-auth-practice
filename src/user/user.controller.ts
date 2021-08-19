import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginGuard } from 'src/auth/guards/login.guard';
import IUser from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(LoginGuard)
  @ApiOperation({
    description: 'Returns a all users',
  })
  @ApiOkResponse({
    description: 'List of all users',
  })
  @ApiUnauthorizedResponse({
    description: 'Login required',
  })
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }
}
