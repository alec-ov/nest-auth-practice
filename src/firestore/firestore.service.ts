import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';

import { Model, Schema } from './classes/firestore.model';

//const db = firestore();

@Injectable()
export class FirestoreService {
  private db: firestore.Firestore;
  constructor() {
    this.db = firestore();
  }
  createCollection<T extends Schema>(name: string) {
    return new Model<T>(this.db, name);
  }
}
