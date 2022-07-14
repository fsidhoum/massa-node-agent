import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { CommonModule } from './common/common.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [ScheduleModule.forRoot(), TaskModule, CommonModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
