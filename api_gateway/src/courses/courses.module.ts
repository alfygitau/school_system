import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { CoursesController } from './courses.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [CoursesController],
  providers: [],
  exports: [],
})
export class CoursesModule {}
