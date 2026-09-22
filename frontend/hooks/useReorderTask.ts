"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  reorderTask,
} from "@/service/task.service";
import { toast } from "sonner";
import { ReorderTaskInput } from "@/types/task";

const useReorderTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ReorderTaskInput) => reorderTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast.success("Task moved successfully");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to move task",
      );
    },
  });

  return mutation;
};

export default useReorderTask;