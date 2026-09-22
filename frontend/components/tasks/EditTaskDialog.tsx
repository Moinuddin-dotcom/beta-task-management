"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUpdateTask from "@/hooks/useUpdateTask";
import type { Task } from "@/types/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const editTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z.string().trim().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

type EditTaskFormValues = z.infer<typeof editTaskSchema>;

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditTaskDialog({
  task,
  open,
  onOpenChange,
}: EditTaskDialogProps) {
  const updateTaskMutation = useUpdateTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTaskFormValues>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [open, task, reset]);

  const onSubmit = (data: EditTaskFormValues) => {
    updateTaskMutation.mutate(
      {
        id: task.id,
        data,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>

          <DialogDescription>
            Update the task details and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>

            <input
              {...register("title")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
            />

            {errors.title && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              {...register("description")}
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
            />

            {errors.description && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>

              <select
                {...register("priority")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                {...register("status")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {updateTaskMutation.isError && (
            <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
              {updateTaskMutation.error instanceof Error
                ? updateTaskMutation.error.message
                : "Failed to update task."}
            </p>
          )}

          <button
            type="submit"
            disabled={updateTaskMutation.isPending}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateTaskMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}