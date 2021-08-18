import {
  DynamicModule,
  Module,
  NotImplementedException,
  Provider,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firestore, ServiceAccount } from 'firebase-admin';

import { FirestoreService } from './firestore.service';
import { FirestoreAsyncOptions } from './classes/firestore.async.options';
import { Model, Schema } from './classes/firestore.model';

@Module({})
export class FirestoreModule {
  static forRoot(options: ServiceAccount): DynamicModule {
    // Initialize the firebase admin app
    admin.initializeApp({
      credential: admin.credential.cert(options),
    });

    return {
      module: FirestoreModule,
      global: true,
      providers: [
        FirestoreService,
        {
          provide: firestore.Firestore,
          useValue: firestore(),
        },
      ],
      controllers: [],
      exports: [FirestoreService],
    };
  }

  static forRootAsync(options: FirestoreAsyncOptions): DynamicModule {
    const imports = [];
    const providers: Provider<any>[] = [FirestoreService];
    const exports = [FirestoreService];

    if (options.imports) {
      imports.push(...options.imports);
    }
    providers.push({
      provide: firestore.Firestore,
      useFactory: async (...injections) => {
        const serviceAccount = await options.useFactory(...injections);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        return firestore();
      },
      inject: options.inject,
    });

    return {
      module: FirestoreModule,
      global: true,
      imports,
      providers,
      exports,
    };
  }

  static forFeature<T extends Schema>(name): DynamicModule {
    throw new NotImplementedException();
    const providers: Provider<any>[] = [];
    providers.push(FirestoreService);
    providers.push({
      provide: firestore.Firestore,
      useValue: firestore(),
    });

    providers.push({
      provide: Model.name + '_' + name,
      useFactory: async (firestoreService: FirestoreService) => {
        return firestoreService.createCollection<T>(name);
      },
      inject: [FirestoreService],
    });

    return {
      module: FirestoreModule,
      global: false,
      providers,
      exports: providers,
    };
  }
}
