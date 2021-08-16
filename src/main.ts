import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import { AppModule } from './app.module';

async function bootstrap() {
  // Set the config options
  const adminConfig: ServiceAccount = JSON.parse(
    readFileSync('./firebase-adminsdk.json').toString(),
  );
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
