import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TaskService } from './task.service';

@Module({
  imports: [HttpModule],
  exports: [TaskService],
  providers: [TaskService],
})
export class TaskModule {}
