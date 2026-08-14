import { prisma } from '@lib/db';
import type { CreateTodoDto, UpdateTodoDto } from './todos.types';
import type { TodoStatus } from '@/lib/types/todos';

export class TodoRepository {
	findAll(status?: TodoStatus) {
		return prisma.todo.findMany({
			where: status
				? {
						status
					}
				: undefined,
			orderBy: {
				createdAt: 'desc'
			}
		});
	}

	findById(id: string) {
		return prisma.todo.findUnique({
			where: { id }
		});
	}

	create(data: CreateTodoDto) {
		return prisma.todo.create({ data });
	}

	update(id: string, data: UpdateTodoDto) {
		return prisma.todo.update({
			where: { id },
			data
		});
	}

	delete(id: string) {
		return prisma.todo.delete({
			where: { id }
		});
	}
}
