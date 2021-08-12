import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterUserDto from './dto/user.register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByLogin(login: string) {
    return this.usersRepository.findOne({ where: { login } });
  }

  async findById(id: number) {
    return this.usersRepository.findOne(id);
  }

  async createOne(user: RegisterUserDto) {
    const userEntity = this.usersRepository.create(user);
    return this.usersRepository.save(userEntity);
  }

  async updateToken(userId, token) {
    const user = await this.usersRepository.findOne(userId);
    user.refresh_token = token;
    return this.usersRepository.save(user);
  }
}
