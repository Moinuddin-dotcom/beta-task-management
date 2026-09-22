"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import useAllTasks from "@/hooks/useAllTasks";
import useReorderTask from "@/hooks/useReorderTask";
import type { TaskStatus } from "@/types/task";
import TaskColumn from "./TaskColumn";
import TaskNiceLoading from "./TaskNiceLoading";
import CreateTaskDialog from "./CreateTaskDialog";

const columns: { status: TaskStatus; title: string }[] = [
  { status: "PENDING", title: "Pending" },
  { status: "IN_PROGRESS", title: "In Progress" },
  { status: "COMPLETED", title: "Completed" },
];

export default function TaskBoard() {
  const { tasks, isLoading, isError, error } = useAllTasks();
  const reorderTaskMutation = useReorderTask();

  if (isLoading) {
    return <TaskNiceLoading />;
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Failed to load tasks
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading tasks."}
          </p>
        </div>
      </main>
    );
  }

  const allTasks = tasks ?? [];

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    reorderTaskMutation.mutate({
      taskId: draggableId,
      destinationStatus: destination.droppableId as TaskStatus,
      destinationPosition: destination.index,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <p className="text-sm font-medium text-slate-500">
              Project & Task Management
            </p>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Task Management Portal
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Organize and track your tasks across different stages.
                </p>
              </div>

              <p className="text-sm text-slate-500">
                {allTasks.length} {allTasks.length === 1 ? "task" : "tasks"}{" "}
                total
              </p>
              <CreateTaskDialog />
            </div>
          </header>

          <div className="grid gap-5 lg:grid-cols-3">
            {columns.map((column) => (
              <TaskColumn
                key={column.status}
                title={column.title}
                status={column.status}
                tasks={allTasks
                  .filter((task) => task.status === column.status)
                  .sort((a, b) => a.position - b.position)}
              />
            ))}
          </div>
        </div>
      </main>
    </DragDropContext>
  );
}
