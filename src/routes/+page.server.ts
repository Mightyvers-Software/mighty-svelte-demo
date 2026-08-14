// src/routes/+page.server.ts

import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { CreateTodoSchema, UpdateTodoSchema } from '@/lib/schemas/todo';
import { todoService } from '@/services/todos/todo.service';
import { ZodError } from 'zod';
import type { FormErrors } from '@/lib/types/forms';
import type { TodoStatus } from '@/lib/types/todos';

export const load: PageServerLoad = async ({ url }) => {
	const status = url.searchParams.get('status') as TodoStatus | null;

	const todos = await todoService.getTodos(status ?? undefined);

	return {
		todos,
		status
	};
};
export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();

		const id = String(formData.get('id'));

		try {
			await todoService.deleteTodo(id);
		} catch (error) {
			return fail(400, {
				message: error instanceof Error ? error.message : 'Failed to delete todo'
			});
		}

		throw redirect(303, '/');
	},
	create: async ({ request }) => {
		const formData = await request.formData();

		try {
			const data = CreateTodoSchema.parse({
				title: String(formData.get('title') ?? ''),
				status: String(formData.get('status') ?? 'TODO'),
				latitude: Number(formData.get('latitude')),
				longitude: Number(formData.get('longitude')),
				address: String(formData.get('address') ?? '')
			});

			await todoService.createTodo(data);
		} catch (error) {
			console.error('create todo error', error);
			if (error instanceof ZodError) {
				return fail(400, {
					message: 'Failed to create todo',
					errors: error.flatten().fieldErrors as FormErrors
				});
			}

			return fail(500, {
				message: error instanceof Error ? error.message : 'Failed to create todo',
				errors: {} as FormErrors
			});
		}

		throw redirect(303, '/');
	},
	update: async ({ request }) => {
		const formData = await request.formData();

		const id = String(formData.get('id'));

		try {
			const data = UpdateTodoSchema.parse({
				title: String(formData.get('title') ?? ''),
				status: String(formData.get('status') ?? 'TODO'),
				latitude: Number(formData.get('latitude')),
				longitude: Number(formData.get('longitude')),
				address: String(formData.get('address') ?? '')
			});

			await todoService.updateTodo(id, data);
		} catch (error) {
			return fail(400, {
				message: error instanceof Error ? error.message : 'Failed to update todo'
			});
		}

		throw redirect(303, '/');
	}
};
