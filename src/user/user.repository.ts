import { Injectable } from '@nestjs/common';
import { Model } from 'src/firestore/classes/firestore.model';
import { FirestoreService } from 'src/firestore/firestore.service';

import RegisterUserDto from './dto/user.register.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepositoty {
  private userModel: Model<User>;
  constructor(private firestoreService: FirestoreService) {
    this.userModel = this.firestoreService.createCollection<User>('users');
  }

  async getAll(): Promise<User[]> {
    return this.userModel.getAll();
  }

  async getByLogin(login: string) {
    return this.userModel.findOne('login', '==', login);
  }

  async getById(id: string) {
    return this.userModel.getOne(id);
  }

  async addOne(user: RegisterUserDto) {
    return this.userModel.addOne(user);
  }

  async updateToken(userId, token) {
    return this.userModel.updateOne(userId, { refreshToken: token });
  }
}
