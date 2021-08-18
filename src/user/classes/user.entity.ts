import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'src/firestore/classes/firestore.model';
import IUser from '../interfaces/user.interface';

export class User implements IUser, Schema {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  password: string;

  @ApiProperty()
  login: string;

  refreshToken?: string;
}
