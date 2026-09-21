import { asyncHandler } from "../utils/asyncHandler";
import {
  createTaskService,
  deleteTaskService,
  getAllTaskService,
  getTaskByIdService,
  updateTaskService,
} from "../services/task.service";
import type { RequestHandler } from "express";
import {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} from "../validation/task.validation";
import { AppError } from "../utils/AppError";

export const createTaskController: RequestHandler = asyncHandler(
  async (req) => {
    const validatedData = createTaskValidationSchema.parse(req.body);
    const task = await createTaskService(validatedData);

    return {
      statusCode: 201,
      success: true,
      message: "Task created successfully",
      data: task,
    };
  },
);

export const getAllTaskController: RequestHandler = asyncHandler(async () => {
  const allTasks = await getAllTaskService();
  return {
    statusCode: 200,
    success: true,
    message: "All tasks fetched successfully",
    data: allTasks,
  };
});

export const getTaskByIdController: RequestHandler = asyncHandler(
  async (req) => {
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("Invalid task ID", 400);
    }
    const taskById = await getTaskByIdService(id);
     if (!taskById) {
    throw new AppError("Task not found", 404);
  }
    return {
      statusCode: 200,
      success: true,
      message: "Task fetched successfully",
      data: taskById,
    };
  },
);

export const updateTaskController: RequestHandler = asyncHandler(
  async (req) => {
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("Invalid task ID", 400);
    }

    const validatedData = updateTaskValidationSchema.parse(req.body);

    const updatedTask = await updateTaskService(id, validatedData);
    return {
      statusCode: 200,
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    };
  },
);

export const deleteTaskController: RequestHandler = asyncHandler(
  async (req) => {
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("Invalid task ID", 400);
    }
    const deletedTask = await deleteTaskService(id);
    return {
      statusCode: 200,
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    };
  },
);
