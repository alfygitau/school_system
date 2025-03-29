import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dtos/CreateNews.dto';
import { UpdateNewsDto } from './dtos/UpdateNews.dto';
import { News } from 'src/entity/News';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private newsRepo: Repository<News>) {}

  async createNews(data: CreateNewsDto): Promise<News> {
    try {
      const news = this.newsRepo.create(data);
      return await this.newsRepo.save(news);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create news');
    }
  }

  async getAllNews(): Promise<News[]> {
    try {
      return await this.newsRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch news');
    }
  }

  async getNewsById(id: string): Promise<News> {
    try {
      const news = await this.newsRepo.findOne({ where: { id } });
      if (!news) {
        throw new NotFoundException(`News with ID ${id} not found`);
      }
      return news;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch news');
    }
  }

  async updateNews(id: string, data: UpdateNewsDto): Promise<News> {
    try {
      const news = await this.getNewsById(id); // Ensure news exists

      if (!Object.keys(data).length) {
        throw new BadRequestException('No update data provided');
      }

      await this.newsRepo.update(id, data);
      return this.getNewsById(id); // Return updated record
    } catch (error) {
      throw new InternalServerErrorException('Failed to update news');
    }
  }

  async deleteNews(id: string) {
    try {
      const news = await this.getNewsById(id); // Ensure news exists
      await this.newsRepo.delete(id);
      return { message: 'News deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete news');
    }
  }
}
