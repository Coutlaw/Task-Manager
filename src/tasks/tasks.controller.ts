import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {

	// dependency injection for the service
	constructor(private taskService: TasksService) { }


	@Get()
	getAllTasks() {
		return this.taskService.getAllTasks();
	}
}
