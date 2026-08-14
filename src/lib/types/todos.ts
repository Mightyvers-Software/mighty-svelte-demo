export type TodoStatus = 'TODO' | 'SCHEDULED' | 'DONE';

export interface Todo {
	id: string;
	title: string;
	status: TodoStatus;
	latitude: number;
	longitude: number;
	address?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateTodoRequest {
	title: string;
	status: TodoStatus;
	latitude: number;
	longitude: number;
	address?: string;
}

export type UpdateTodoRequest = Partial<CreateTodoRequest>;
