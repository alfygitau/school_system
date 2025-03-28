import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StorageService } from './storage.service';

@Controller()
export class StorageController {
  constructor(private readonly firebaseService: StorageService) {}

  @MessagePattern('upload.file')
  async uploadFile(@Payload() file: Express.Multer.File) {
    return this.firebaseService.uploadFile(file);
  }
}
