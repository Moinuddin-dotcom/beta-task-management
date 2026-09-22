import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import type {
  CreateTaskValidationInput,
  ReorderTaskValidationInput,
  UpdateTaskValidationInput,
} from "../validation/task.validation";

export const createTaskService = async (data: CreateTaskValidationInput) => {
  const lastTask = await prisma.task.findFirst({
    where: {
      status: data.status,
    },
    orderBy: {
      position: "desc",
    },
    select: {
      position: true,
    },
  });
  const position = lastTask ? lastTask.position + 1 : 0;
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      position,
    },
  });
};

export const getAllTaskService = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getTaskByIdService = async (id: string) => {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const updateTaskService = async (
  id: string,
  data: UpdateTaskValidationInput,
) => {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.priority !== undefined && { priority: data.priority }),
      ...(data.status !== undefined && { status: data.status }),
    },
  });
};

export const deleteTaskService = async (id: string) => {
  return await prisma.task.delete({
    where: {
      id,
    },
  });
};

export const reorderTaskService = async (
  data: ReorderTaskValidationInput,
) => {
  return await prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({
      where: {
        id: data.taskId,
      },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    const sourceStatus = task.status;
    const destinationStatus = data.destinationStatus;

    if (sourceStatus === destinationStatus) {
      const tasks = await tx.task.findMany({
        where: {
          status: sourceStatus,
        },
        orderBy: {
          position: "asc",
        },
      });

      const taskIndex = tasks.findIndex(
        (item) => item.id === task.id,
      );

      if (taskIndex === -1) {
        throw new AppError(
          "Task not found in its current column",
          404,
        );
      }

      const reorderedTasks = tasks.filter(
        (item) => item.id !== task.id,
      );

      const destinationPosition = Math.min(
        data.destinationPosition,
        reorderedTasks.length,
      );

      reorderedTasks.splice(destinationPosition, 0, task);

      await Promise.all(
        reorderedTasks.map((item, index) =>
          tx.task.update({
            where: {
              id: item.id,
            },
            data: {
              position: index,
            },
          }),
        ),
      );

      return await tx.task.findUnique({
        where: {
          id: task.id,
        },
      });
    }

    const sourceTasks = await tx.task.findMany({
      where: {
        status: sourceStatus,
        id: {
          not: task.id,
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    const destinationTasks = await tx.task.findMany({
      where: {
        status: destinationStatus,
      },
      orderBy: {
        position: "asc",
      },
    });

    const destinationPosition = Math.min(
      data.destinationPosition,
      destinationTasks.length,
    );

    destinationTasks.splice(destinationPosition, 0, task);

    await Promise.all(
      sourceTasks.map((item, index) =>
        tx.task.update({
          where: {
            id: item.id,
          },
          data: {
            position: index,
          },
        }),
      ),
    );

    await Promise.all(
      destinationTasks.map((item, index) =>
        tx.task.update({
          where: {
            id: item.id,
          },
          data: {
            status: destinationStatus,
            position: index,
          },
        }),
      ),
    );

    return await tx.task.findUnique({
      where: {
        id: task.id,
      },
    });
  });
};
