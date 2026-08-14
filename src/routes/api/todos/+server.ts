import { CreateTodoSchema } from '@/lib/schemas/todo';
import { todoService } from '@/services/todos/todo.service';
import { apiResponse } from '@lib/api/response';

export async function GET() {
	try {
		const todos = await todoService.getTodos();
		return apiResponse.ok(todos);
	} catch (error) {
		return apiResponse.error(error);
	}
}

export async function POST({ request }) {
	try {
		const body = await request.json();
		const data = CreateTodoSchema.parse(body);

		const todo = await todoService.createTodo(data);

		return apiResponse.created(todo);
	} catch (error) {
		return apiResponse.error(error);
	}
}
