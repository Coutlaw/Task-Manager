import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	// controller level logger
	private logger = new Logger('TasksController');

	// dependency injection for the service
	constructor(private taskService: TasksService) { }

	@Get()
	getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
		this.logger.verbose(`User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
		return this.taskService.getTasks(filterDto, user);
	}


	@Get('/:id')
	getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
		return this.taskService.getTaskById(id, user);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
		this.logger.verbose(`User ${user.username} creating Task. Data: ${JSON.stringify(createTaskDto)}`);
		return this.taskService.createTask(createTaskDto, user);
	}

	@Delete('/:id')
	deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
		return this.taskService.deleteTask(id, user);
	}

	@Patch('/:id/status')
	updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus, @GetUser() user: User): Promise<Task> {
		return this.taskService.updateTaskStatus(id, status, user);
	}
}
