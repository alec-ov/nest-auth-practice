import { Injectable } from '@nestjs/common';

import { Model, Schema } from './classes/firestore.model';

// Import firebase-admin
import { firestore } from 'firebase-admin';

//const db = firestore();

@Injectable()
export class FirestoreService {
  constructor(private readonly db: firestore.Firestore) {}

  createCollection<T extends Schema>(name: string) {
    return new Model<T>(this.db, name);
  }
}
