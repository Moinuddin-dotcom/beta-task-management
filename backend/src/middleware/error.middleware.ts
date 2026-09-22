import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues,
      data: null,
    });
  }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        data: null,
      });
    }
  }

  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Something went wrong on the server";

  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};