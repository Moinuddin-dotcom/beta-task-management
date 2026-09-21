import z from "zod";

export const createTaskValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});


export const updateTaskValidationSchema = createTaskValidationSchema.partial();

export type CreateTaskValidationInput = z.infer<typeof createTaskValidationSchema>;
export type UpdateTaskValidationInput = z.infer<typeof updateTaskValidationSchema>;
