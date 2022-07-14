import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  providers: [EventGateway],
})
export class EventModule {}
