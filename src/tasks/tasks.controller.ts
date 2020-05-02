import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

	// dependency injection for the service
	constructor(private taskService: TasksService) { }


	@Get()
	getAllTasks(): Task[] {
		return this.taskService.getAllTasks();
	}

	@Post()
	// alternatively could use @Body body, to get the whole request body
	createTask(@Body('title') title: string, @Body('description') description: string): Task {
		return this.taskService.createTask(title, description);
	}
}
