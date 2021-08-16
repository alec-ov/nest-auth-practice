import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Module({
  providers: [FirestoreService],
  controllers: [],
  exports: [FirestoreService],
})
export class FirestoreModule {}
