import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private bucket: any;

  constructor(private configService: ConfigService) {
    // Load Firebase credentials
    const serviceAccount = JSON.parse(
      this.configService.get<string>('FIREBASE_CONFIG'),
    );

    // Initialize Firebase App only if it's not initialized already
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'e-store-ff279.appspot.com',
      });
    }

    this.bucket = admin.storage().bucket();
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `uploads/${uuidv4()}_${file.originalname}`;
    const fileRef = this.bucket.file(fileName);

    // Ensure the file buffer is in the correct format
    const buffer = Buffer.from(file.buffer);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Make file publicly accessible
    await fileRef.makePublic();

    return `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
  }
}
