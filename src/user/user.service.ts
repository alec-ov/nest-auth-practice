import { Injectable } from '@nestjs/common';
import RegisterUserDto from '../auth/dto/auth.register.dto';
import { User } from './classes/user.entity';
import { UserRepositoty } from './user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepositoty) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.getAll();
  }

  async findByLogin(login: string) {
    return this.usersRepository.getByLogin(login);
  }

  async findById(id: string) {
    return this.usersRepository.getById(id);
  }

  async createOne(user: RegisterUserDto) {
    return this.usersRepository.addOne(user);
  }

  async updateToken(userId, token) {
    return this.usersRepository.updateToken(userId, token);
  }
}
