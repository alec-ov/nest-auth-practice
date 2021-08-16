import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { UserRepositoty } from './user.repository';

@Module({
  imports: [FirestoreModule],
  providers: [UserService, UserRepositoty],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
