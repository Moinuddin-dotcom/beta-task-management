import { getTasks } from "@/service/task.service"
import { useQuery } from "@tanstack/react-query"

const useAllTasks = () => {
  const {data: tasks, isLoading, isError, error} = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })
  return {tasks, isLoading, isError, error}
}

export default useAllTasks;