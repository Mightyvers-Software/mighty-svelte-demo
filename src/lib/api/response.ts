import { json } from '@sveltejs/kit';
import { AppError } from '@lib/errors/app.error';

export const apiResponse = {
	ok: <T>(data: T) => json(data, { status: 200 }),

	created: <T>(data: T) => json(data, { status: 201 }),

	noContent: () => new Response(null, { status: 204 }),

	badRequest: (message: string) => json({ error: message }, { status: 400 }),

	notFound: (message: string) => json({ error: message }, { status: 404 }),

	error: (error: unknown) => {
		if (error instanceof AppError) {
			return json({ error: error.message }, { status: error.statusCode });
		}

		console.error(error);

		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
