import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

	// dependency injection for the service
	constructor(private taskService: TasksService) { }


	@Get()
	getAllTasks(): Task[]{
		return this.taskService.getAllTasks();
	}
}
