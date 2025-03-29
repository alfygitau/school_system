import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { UnitsModule } from './unit/units.module';
import { UnitsController } from './unit/units.controller';
import { AdmissionsModule } from './admissions/admissions.module';
import { AdmissionsController } from './admissions/admissions.controller';
import { ExamsController } from './exam/exams.controller';
import { ExamsModule } from './exam/exams.module';
import { LoggerService } from './logger/logger.service';
import { RequestLoggerMiddleware } from './logger/logger.middleware';
import { ResultsController } from './result/results.controller';
import { ResultsModule } from './result/results.module';
import { GradeModule } from './grade/grade.module';
import { GradeController } from './grade/grade.controller';
import { BillingController } from './billing/billing.controller';
import { BillingModule } from './billing/billing.module';
import { AccomodationModule } from './accomodation/accomodation.module';
import { AccomodationController } from './accomodation/accomodation.controller';
import { RoomsModule } from './room/rooms.module';
import { RoomsController } from './room/rooms.controller';
import { BookingController } from './booking/booking.controller';
import { BookingModule } from './booking/booking.module';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { EContentModule } from './econtent/econtent.module';
import { EContentController } from './econtent/econtent.controller';
import { StorageController } from './storage/storage.controller';
import { StorageModule } from './storage/storage.module';
import { NewsModule } from './news/news.module';
import { NewsController } from './news/news.controller';
import { AddressController } from './address/address.controller';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    NatsClientModule,
    UsersModule,
    ProfileModule,
    AuthModule,
    CoursesModule,
    FacultyModule,
    DepartmentsModule,
    UnitsModule,
    AdmissionsModule,
    ExamsModule,
    ResultsModule,
    GradeModule,
    BillingModule,
    AccomodationModule,
    RoomsModule,
    BookingModule,
    MaintenanceModule,
    EContentModule,
    StorageModule,
    NewsModule,
    AddressModule,
  ],
  controllers: [
    UsersController,
    ProfileController,
    AuthController,
    CoursesController,
    FacultyController,
    DepartmentsController,
    UnitsController,
    AdmissionsController,
    ExamsController,
    ResultsController,
    GradeController,
    BillingController,
    AccomodationController,
    RoomsController,
    BookingController,
    MaintenanceController,
    EContentController,
    StorageController,
    NewsController,
    AddressController,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
