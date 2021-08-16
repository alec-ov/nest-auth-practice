import { firestore } from 'firebase-admin';
import { v4 as uuid } from 'uuid';

type FirestoreOperator =
  | '=='
  | '>='
  | '<='
  | 'in'
  | 'not-in'
  | '>'
  | '<'
  | '!='
  | 'array-contains'
  | 'array-contains-any';

export class Schema {
  id: string;
}
export class Model<T extends Schema> {
  public readonly name;
  private readonly db: firestore.Firestore;

  constructor(db, name) {
    this.db = db;
    this.name = name;
  }

  private schema(docSnapshot): T {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as T;
  }

  async getOne(id: string): Promise<T> {
    const docSnapshot = await this.db.collection(this.name).doc(id).get();
    return this.schema(docSnapshot);
  }

  async addOne(doc: Omit<T, 'id'>): Promise<T> {
    const docRef = this.db.collection(this.name).doc(uuid());
    await docRef.set(doc);
    return this.schema(await docRef.get());
  }

  async updateOne(id, doc) {
    const docRef = await this.db.collection(this.name).doc(id);
    await docRef.set(doc, { merge: true });
    return this.schema(await docRef.get());
  }

  async getAll(): Promise<T[]> {
    const docs = await this.db.collection(this.name).get();
    const result: T[] = [];
    docs.forEach((doc) => result.push(this.schema(doc)));
    return result;
  }

  async findAll(
    field: string,
    operator: FirestoreOperator,
    value: unknown,
  ): Promise<T[]> {
    const docs = await this.db
      .collection(this.name)
      .where(field, operator, value)
      .get();
    const result: T[] = [];
    docs.forEach((doc) => result.push(this.schema(doc)));

    return result;
  }

  async findOne(
    field: string,
    operator: FirestoreOperator,
    value: unknown,
  ): Promise<T> {
    const docs = await this.db
      .collection(this.name)
      .where(field, operator, value)
      .limit(1)
      .get();

    const result: T[] = [];
    docs.forEach((doc) => result.push(this.schema(doc)));

    return result[0];
  }
}
