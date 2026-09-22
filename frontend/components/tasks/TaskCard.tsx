
"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "@/types/task";
import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

const priorityStyles = {
  LOW: "bg-emerald-50 text-emerald-700",
  MEDIUM: "bg-amber-50 text-amber-700",
  HIGH: "bg-red-50 text-red-700",
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({
  task,
  index,
}: TaskCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <article
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition ${
              snapshot.isDragging
                ? "rotate-1 shadow-lg"
                : "hover:-translate-y-0.5 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="line-clamp-2 font-semibold text-slate-900">
                {task.title}
              </h3>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
              >
                {task.priority}
              </span>
            </div>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
              {task.description}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-400">
                Created {formatDate(task.createdAt)}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  className="text-xs font-medium text-slate-600 transition hover:text-slate-900"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className="text-xs font-medium text-red-500 transition hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        )}
      </Draggable>

      <EditTaskDialog
        task={task}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteTaskDialog
        task={task}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}