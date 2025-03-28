import { Module } from '@nestjs/common';
import { EContentMicroserviceController } from './econtent/econtent.controller';
import { CourseContent } from './entity/Content';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EContentModule } from './econtent/econtent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [CourseContent],
      database: 'learning_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    EContentModule,
  ],
  controllers: [EContentMicroserviceController],
  providers: [],
  exports: [],
})
export class AppModule {}
