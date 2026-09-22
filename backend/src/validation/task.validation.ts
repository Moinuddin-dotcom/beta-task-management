import z from "zod";

export const createTaskValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

export const updateTaskValidationSchema = createTaskValidationSchema.partial();

export const reorderTaskValidationSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  destinationStatus: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  destinationPosition: z.number().int().min(0),
});


export type ReorderTaskValidationInput = z.infer<
  typeof reorderTaskValidationSchema
>;

export type CreateTaskValidationInput = z.infer<
  typeof createTaskValidationSchema
>;
export type UpdateTaskValidationInput = z.infer<
  typeof updateTaskValidationSchema
>;
