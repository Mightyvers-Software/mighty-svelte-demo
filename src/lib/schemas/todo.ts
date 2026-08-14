import { z } from "zod";

export const TodoStatusSchema = z.enum(["TODO", "SCHEDULED", "DONE"]);

export const CreateTodoSchema = z.object({
  title: z.string().min(1).max(255),
  status: TodoStatusSchema.default("TODO"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().max(500).optional(),
});

export const UpdateTodoSchema = CreateTodoSchema.partial();
