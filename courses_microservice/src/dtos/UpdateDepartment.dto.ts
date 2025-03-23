import { Faculty } from 'src/entity/Faculty';

export class UpdateDepartmentDto {
  name?: string; // Department name (e.g., "Department of Computer Science")

  code?: string; // Unique department code (e.g., "CS")

  description?: string; // Brief description of the department

  faculty?: Faculty; // Brief description of the department

  status?: string; // Department status (e.g., "active", "inactive")
}


export class NewUpdateDepartmentDto {
  name?: string; // Department name (e.g., "Department of Computer Science")

  code?: string; // Unique department code (e.g., "CS")

  description?: string; // Brief description of the department

  faculty?: string; // Brief description of the department

  status?: string; // Department status (e.g., "active", "inactive")
}

