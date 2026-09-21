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
      throw new Error("Invalid task ID");
    }
    const taskById = await getTaskByIdService(id);
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
      throw new Error("Invalid task ID");
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
      throw new Error("Invalid task ID");
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
