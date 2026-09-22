export default function TaskNiceLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900 [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900 [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-slate-900">
          Loading tasks
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preparing your task workspace...
        </p>
      </div>
    </main>
  );
}