export class CreateCourseUnitsDto {
  courseId: string;

  unitIds: string[]; // List of unit IDs to be added to the course
}
