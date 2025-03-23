import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { UsersController } from './users/users.controller';
import { ProfileModule } from './profile/profile.module';
import { ProfileController } from './profile/profile.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { CoursesModule } from './courses/courses.module';
import { CoursesController } from './courses/courses.controller';
import { FacultyModule } from './faculty/faculty.module';
import { FacultyController } from './faculty/faculty.controller';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsController } from './departments/departments.controller';

@Module({
  imports: [
    NatsClientModule,
    UsersModule,
    ProfileModule,
    AuthModule,
    CoursesModule,
    FacultyModule,
    DepartmentsModule,
  ],
  controllers: [
    UsersController,
    ProfileController,
    AuthController,
    CoursesController,
    FacultyController,
    DepartmentsController,
  ],
  providers: [],
})
export class AppModule {}
