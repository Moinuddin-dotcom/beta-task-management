import { prisma } from "../lib/prisma"
import type { CreateTaskValidationInput, UpdateTaskValidationInput } from "../validation/task.validation"



export const createTaskService = async (data: CreateTaskValidationInput) => {
  return await prisma.task.create({
    data:{
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status
    }
  })
}

export const getAllTaskService = async () => {
    return await prisma.task.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}


export const getTaskByIdService = async (id:string) => {
    return await prisma.task.findUnique({
        where: {
            id,
        }
    })
}

export const updateTaskService = async (id:string, data: UpdateTaskValidationInput) => {
    return await prisma.task.update({
        where: {
            id,
        },
        data: {
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.priority !== undefined && { priority: data.priority }),
            ...(data.status !== undefined && { status: data.status }),
        }
    })
}


export const deleteTaskService = async (id: string) => {
  return await prisma.task.delete({
    where: {
      id,
    },
  });
};