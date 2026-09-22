export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900 [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900 [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-slate-900" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Loading tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please wait while we prepare your workspace.
          </p>
        </div>
      </div>
    </main>
  );
}