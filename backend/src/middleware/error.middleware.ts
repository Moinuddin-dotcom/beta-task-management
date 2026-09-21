import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Something went wrong on the server";

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};