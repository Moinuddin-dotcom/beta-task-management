"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import EditTaskDialog from "./EditTaskDialog";

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

export default function TaskCard({ task }: { task: Task }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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

          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="text-xs font-medium text-slate-600 transition hover:text-slate-900"
          >
            Edit
          </button>
        </div>
      </article>

      <EditTaskDialog
        task={task}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}