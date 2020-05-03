import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

	// dependency injection for the service
	constructor(private taskService: TasksService) { }

	@Get()
	getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
		if (filterDto) {
			return this.taskService.getAllTasksWithFilter(filterDto);
		}
		return this.taskService.getAllTasks();
	}


	@Get('/:id')
	getTaskById(@Param('id') id: string): Task {
		return this.taskService.getTaskById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.taskService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string): void {
		this.taskService.deleteTask(id);
	}

	@Patch('/:id/status')
	updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
		return this.taskService.updateTaskStatus(id, status);
	}
}
