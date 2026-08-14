import type { Todo, TodoStatus } from "@prisma/client";

export interface CreateTodoDto {
  title: string;
  status: TodoStatus;
  latitude: number;
  longitude: number;
  address?: string;
}

export interface UpdateTodoDto {
  title?: string;
  status?: TodoStatus;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export type TodoEntity = Todo;
