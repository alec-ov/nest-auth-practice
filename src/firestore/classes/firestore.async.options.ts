import { DynamicModule, Type, ForwardReference } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';

export interface FirestoreAsyncOptions {
  imports: (
    | DynamicModule
    | Type<any>
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
  inject: any[];
  useFactory: (...args: any[]) => Promise<ServiceAccount>;
}
