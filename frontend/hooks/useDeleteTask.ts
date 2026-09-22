import { deleteTask } from '@/service/task.service';
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteTask = () => {
 const queryClient = useQueryClient();
 const mutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    }
 })
 return mutation
}

export default useDeleteTask
