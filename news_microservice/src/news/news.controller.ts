import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dtos/CreateNews.dto';
import { UpdateNewsDto } from './dtos/UpdateNews.dto';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @MessagePattern('news.create')
  async createNews(data: CreateNewsDto) {
    return this.newsService.createNews(data);
  }

  @MessagePattern('news.getAll')
  async getAllNews() {
    return this.newsService.getAllNews();
  }

  @MessagePattern('news.getById')
  async getNewsById(id: string) {
    return this.newsService.getNewsById(id);
  }

  @MessagePattern('news.update')
  async updateNews({ id, data }: { id: string; data: UpdateNewsDto }) {
    return this.newsService.updateNews(id, data);
  }

  @MessagePattern('news.delete')
  async deleteNews(id: string) {
    return this.newsService.deleteNews(id);
  }
}
