import { Controller } from '@nestjs/common';
import { EContentService } from './econtent.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EContentMicroserviceController {
  constructor(private readonly eContentService: EContentService) {}

  // 🔵 Add Course Content (includes yearOfStudy)
  @MessagePattern('econtent.addContent')
  addContent(data: {
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
    return this.eContentService.addContent(
      data.courseId,
      data.unitId,
      data.title,
      data.yearOfStudy,
      data.textContent,
      data.videoUrl,
      data.documentUrl,
      data.imageUrl,
      data.audioUrl,
    );
  }

  // 🔵 Get Course Content (filtered by yearOfStudy)
  @MessagePattern('econtent.getContentByCourse')
  getContentByCourse(data: { courseId: string; yearOfStudy: number }) {
    return this.eContentService.getContentByCourse(
      data.courseId,
      data.yearOfStudy,
    );
  }

  // 🔵 Get Unit Content (filtered by yearOfStudy)
  @MessagePattern('econtent.getContentByUnit')
  getContentByUnit(data: { unitId: string; yearOfStudy: number }) {
    return this.eContentService.getContentByUnit(data.unitId, data.yearOfStudy);
  }
}
