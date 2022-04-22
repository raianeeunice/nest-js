import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    const tasks = await query.getMany();
    return tasks;
  }
}
