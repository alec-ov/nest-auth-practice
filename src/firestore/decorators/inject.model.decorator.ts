import { Inject } from '@nestjs/common';
import { Model } from '../classes/firestore.model';

export const InjectFirestoreModel = (name: string) =>
  Inject(Model.name + '_' + name);
