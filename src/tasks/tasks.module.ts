import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([TaskRepository])],
})
export class TasksModule {}
