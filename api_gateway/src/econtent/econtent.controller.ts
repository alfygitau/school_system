import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('econtent')
export class EContentController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  // 📌 Add Course Content
  @Post()
  async addContent(@Body() data: {
    courseId: string;
    unitId: string;
    title: string;
    yearOfStudy: number;
    textContent?: string;
    videoUrl?: string;
    documentUrl?: string;
    imageUrl?: string;
    audioUrl?: string;
  }) {
    return this.client.send('econtent.addContent', data);
  }

  // 📌 Get Content by Course & Year
  @Get('course/:courseId/year/:yearOfStudy')
  async getContentByCourse(@Param('courseId') courseId: string, @Param('yearOfStudy') yearOfStudy: number) {
    return this.client.send('econtent.getContentByCourse', { courseId, yearOfStudy: Number(yearOfStudy) });
  }

  // 📌 Get Content by Unit & Year
  @Get('unit/:unitId/year/:yearOfStudy')
  async getContentByUnit(@Param('unitId') unitId: string, @Param('yearOfStudy') yearOfStudy: number) {
    return this.client.send('econtent.getContentByUnit', { unitId, yearOfStudy: Number(yearOfStudy) });
  }
}
