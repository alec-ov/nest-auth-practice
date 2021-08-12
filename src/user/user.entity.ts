import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import IUser from './interfaces/user.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  login: string;

  @Column({ default: '' })
  refresh_token: string;
}
