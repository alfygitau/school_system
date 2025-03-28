import { Module } from '@nestjs/common';
import { StorageController } from './storage/storage.controller';
import { StorageService } from './storage/storage.service';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),
    StorageModule,
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class AppModule {}
