import { createTask } from '@/service/task.service';
import { CreateTaskInput } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateTaskInput) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    }
  })
  return mutation
}

export default useCreateTask
