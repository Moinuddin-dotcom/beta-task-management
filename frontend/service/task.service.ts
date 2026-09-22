import axiosInstance from "@/lib/axios";
import type { CreateTaskInput, ReorderTaskInput, Task, UpdateTaskInput } from "@/types/task";


export const createTask = async(data: CreateTaskInput): Promise<Task> => {
  const res = await axiosInstance.post("/tasks", data);
  return res.data.data;
}


export const getTasks = async (): Promise<Task[]> => {
  const res = await axiosInstance.get("/tasks");
  return res.data.data;
}

export const getTaskById = async(id:string): Promise<Task> => {
  const res = await axiosInstance.get(`/tasks/${id}`);
  return res.data.data;
}


export const updateTask = async (id: string, data: UpdateTaskInput): Promise<Task> => {
  const res = await axiosInstance.patch(`/tasks/${id}`, data);
  return res.data.data;
}

export const deleteTask = async (id: string): Promise<Task> => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data.data;
}



export const reorderTask = async (
  data: ReorderTaskInput,
): Promise<Task> => {
  const res = await axiosInstance.patch("/tasks/reorder", data);
  return res.data.data;
};

