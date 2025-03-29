import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entity/News';
import { Notice } from './entity/Notice';
import { NewsModule } from './news/news.module';
import { NewsController } from './news/news.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [News, Notice],
      database: 'news_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    NewsModule,
  ],
  controllers: [NewsController],
  providers: [],
})
export class AppModule {}
