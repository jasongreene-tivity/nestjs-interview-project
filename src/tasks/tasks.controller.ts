import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // TODO: Implement endpoints
  // GET /tasks
  // POST /tasks
  // GET /tasks/:id
  // PUT /tasks/:id
  // DELETE /tasks/:id
}
