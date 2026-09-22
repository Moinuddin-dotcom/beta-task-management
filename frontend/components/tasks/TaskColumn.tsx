import type { Task, TaskStatus } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export default function TaskColumn({
  title,
  status,
  tasks,
}: TaskColumnProps) {
  return (
    <section className="flex min-h-100 flex-col rounded-2xl bg-slate-100/70 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">{title}</h2>

        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-xs font-semibold text-slate-500 shadow-sm">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 p-6 text-center">
            <p className="text-sm text-slate-400">No tasks here</p>
          </div>
        )}
      </div>
    </section>
  );
}