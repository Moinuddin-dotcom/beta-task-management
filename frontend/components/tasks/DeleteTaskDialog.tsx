"use client";

import type { Task } from "@/types/task";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDeleteTask from "@/hooks/useDeleteTask";
import { toast } from "sonner";

interface DeleteTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
}: DeleteTaskDialogProps) {
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
        onOpenChange(false);
      },
      onError: () => {
        toast.error("Failed to delete task");
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this task?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-slate-700">
              &quot;{task.title}&quot;
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteTaskMutation.isError && (
          <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
            {deleteTaskMutation.error instanceof Error
              ? deleteTaskMutation.error.message
              : "Failed to delete task."}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTaskMutation.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteTaskMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteTaskMutation.isPending ? "Deleting..." : "Delete Task"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
