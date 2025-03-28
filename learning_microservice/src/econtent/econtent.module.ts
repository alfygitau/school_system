import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { EContentMicroserviceController } from './econtent.controller';
import { EContentService } from './econtent.service';
import { CourseContent } from 'src/entity/Content';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CourseContent]), NatsClientModule],
  controllers: [EContentMicroserviceController],
  providers: [EContentService],
  exports: [EContentService],
})
export class EContentModule {}
