import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { GradeController } from './grade.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [GradeController],
  providers: [],
  exports: [],
})
export class GradeModule {}
