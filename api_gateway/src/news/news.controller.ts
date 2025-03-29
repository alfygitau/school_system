import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNewsDto } from './dtos/CreateNews.dto';
import { UpdateNewsDto } from './dtos/UpdateNews.dto';

@Controller('news')
export class NewsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  async createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.natsClient.send('news.create', createNewsDto);
  }

  @Get()
  async getAllNews() {
    return this.natsClient.send('news.getAll', {});
  }

  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    return this.natsClient.send('news.getById', id);
  }

  @Put(':id')
  async updateNews(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.natsClient.send('news.update', { id, data: updateNewsDto });
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: string) {
    return this.natsClient.send('news.delete', id);
  }
}
