import { Injectable } from '@nestjs/common';
import { Model } from 'src/firestore/classes/firestore.model';
import { FirestoreService } from 'src/firestore/firestore.service';

import RegisterUserDto from '../auth/dto/auth.register.dto';
import { User } from './classes/user.entity';

@Injectable()
export class UserRepositoty {
  private userModel: Model<User>;
  constructor(private firestoreService: FirestoreService) {
    this.userModel = this.firestoreService.createCollection<User>('users');
  }

  async getAll(): Promise<User[]> {
    const results = await this.userModel.getAll();
    return results.map((user) => {
      user.refreshToken = '';
      user.password = '';
      return user;
    });
  }

  async getByLogin(login: string) {
    return this.userModel.findOne('login', '==', login);
  }

  async getById(id: string) {
    return this.userModel.getOne(id);
  }

  async addOne(user: RegisterUserDto) {
    const checkExisting = await this.getByLogin(user.login);
    if (checkExisting) throw new Error('login taken');
    return this.userModel.addOne(user);
  }

  async updateToken(userId, token) {
    return this.userModel.updateOne(userId, { refreshToken: token });
  }
}
