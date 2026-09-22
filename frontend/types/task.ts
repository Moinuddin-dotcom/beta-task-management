export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;