import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();

import { readFileSync } from 'fs';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

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

  const PORT = process.env.PORT || 8080;

  await app.listen(PORT);
  Logger.log('Listening on port ' + PORT);
}
bootstrap();
