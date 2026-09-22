"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-7 w-7 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.3 3.6 2.9 17a2 2 0 0 0 1.75 3h14.7a2 2 0 0 0 1.75-3L13.7 3.6a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        <h1 className="mt-5 text-2xl font-semibold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          We couldn&apos;t load this page right now. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    </main>
  );
}