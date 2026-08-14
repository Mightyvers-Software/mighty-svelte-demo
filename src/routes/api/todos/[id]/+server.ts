import { UpdateTodoSchema } from "@/lib/schemas/todo";
import { todoService } from "@/services/todos/todo.service";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  try {
    const todo = await todoService.getTodo(params.id);
    return json(todo);
  } catch {
    return json({ error: "Todo not found" }, { status: 404 });
  }
}

export async function PUT({ params, request }) {
  try {
    const body = await request.json();
    const data = UpdateTodoSchema.parse(body);

    const todo = await todoService.updateTodo(params.id, data);

    return json(todo);
  } catch {
    return json({ error: "Unable to update todo" }, { status: 400 });
  }
}

export async function DELETE({ params }) {
  try {
    await todoService.deleteTodo(params.id);

    return new Response(null, {
      status: 204,
    });
  } catch {
    return json({ error: "Todo not found" }, { status: 404 });
  }
}
