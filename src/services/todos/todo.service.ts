import { NotFoundError } from '@lib/errors/not-found.error';
import { TodoRepository } from './todos.repository';
import type { CreateTodoDto, UpdateTodoDto } from './todos.types';
import type { TodoStatus } from '@/lib/types/todos';

export class TodoService {
	constructor(private readonly repository = new TodoRepository()) {}

	getTodos(status?: TodoStatus) {
		return this.repository.findAll(status);
	}

	async getTodo(id: string) {
		const todo = await this.repository.findById(id);

		if (!todo) {
			throw new NotFoundError('Todo not found');
		}

		return todo;
	}

	createTodo(data: CreateTodoDto) {
		return this.repository.create(data);
	}

	async updateTodo(id: string, data: UpdateTodoDto) {
		await this.getTodo(id);

		return this.repository.update(id, data);
	}

	async deleteTodo(id: string) {
		await this.getTodo(id);
		await this.repository.delete(id);
	}
}

export const todoService = new TodoService();
