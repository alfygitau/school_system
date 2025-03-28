import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseContent } from 'src/entity/Content';
import { Repository } from 'typeorm';

@Injectable()
export class EContentService {
  constructor(
    @InjectRepository(CourseContent)
    private contentRepo: Repository<CourseContent>,
  ) {}

  // 📌 Add a new course content
  async addContent(
    courseId: string,
    unitId: string,
    title: string,
    yearOfStudy: number,
    textContent?: string,
    videoUrl?: string,
    documentUrl?: string,
    imageUrl?: string,
    audioUrl?: string,
  ) {
    const content = this.contentRepo.create({
      courseId,
      unitId,
      title,
      yearOfStudy,
      textContent,
      videoUrl,
      documentUrl,
      imageUrl,
      audioUrl,
    });
    return await this.contentRepo.save(content);
  }

  // 📌 Get content for a course (filtered by year of study)
  async getContentByCourse(courseId: string, yearOfStudy: number) {
    return await this.contentRepo.find({ where: { courseId, yearOfStudy } });
  }

  // 📌 Get content for a specific unit (filtered by year of study)
  async getContentByUnit(unitId: string, yearOfStudy: number) {
    return await this.contentRepo.find({ where: { unitId, yearOfStudy } });
  }
}
