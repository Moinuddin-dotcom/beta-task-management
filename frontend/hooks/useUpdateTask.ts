import { updateTask } from "@/service/task.service";
import { UpdateTaskInput } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query"


const useUpdateTask = () => {
 const queryClient = useQueryClient();
 const mutation = useMutation({
    mutationFn: ({id, data}: {id: string, data: UpdateTaskInput}) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    }
    
 })
 return mutation
}

export default useUpdateTask
