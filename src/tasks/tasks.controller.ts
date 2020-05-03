import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/creat-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

	// dependency injection for the service
	constructor(private taskService: TasksService) { }

	@Get()
	getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
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
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.taskService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string): void {
		this.taskService.deleteTask(id);
	}

	@Patch('/:id/status')
	updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
		return this.taskService.updateTaskStatus(id, status);
	}
}
