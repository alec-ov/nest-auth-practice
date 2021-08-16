import { Schema } from 'src/firestore/classes/firestore.model';
import IUser from './interfaces/user.interface';

export class User implements IUser, Schema {
  id: string;

  name: string;

  password: string;

  login: string;

  refreshToken?: string;
}
