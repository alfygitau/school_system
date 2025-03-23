import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { FacultyController } from './faculty.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [FacultyController],
  providers: [],
})
export class FacultyModule {}
