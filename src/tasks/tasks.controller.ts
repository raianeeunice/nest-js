import { Task } from './tasks.entity';
import { TaskRepository } from './task.repository';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './tasks-status-enum';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  @Get('/home')
  @Render('home')
  root() {
    //
  }

  @Get('/index')
  @Render('index')
  index() {
    return this.taskRepository.getTasks().then((tasks) => ({ tasks: tasks }));
  }

  @Get('/create')
  @Render('create')
  create(): void {
    //
  }

  @Get('/:id/edit')
  @Render('edit')
  async edit(@Param('id') id: string) {
    const task = await this.taskRepository.findOne(id);
    return { task: task };
  }

  @Get('/:id')
  @Render('show')
  async show(@Param('id') id: string) {
    const task = await this.taskRepository.findOne(id);
    return { task: task };
  }

  @Post()
  @Redirect('/tasks/index')
  async store(@Req() request: Request) {
    const task = new Task();
    task.status = TaskStatus.OPEN;
    task.description = request.body['description'];
    task.title = request.body['title'];
    await this.taskRepository.save(task);
    return { task: task };
  }

  @Patch('/:id')
  @Redirect('/tasks/index')
  async update(@Param('id') id: string, @Req() request: Request) {
    const task = await this.taskRepository.findOne(id);

    task.status = request.body['status'];
    task.description = request.body['description'];
    task.title = request.body['title'];

    await this.taskRepository.save(task);

    return { task: task };
  }

  @Delete('/:id')
  @Redirect('/tasks/index')
  delete(@Param('id') id: string) {
    return this.taskRepository.delete(id);
  }
}
