import type { Response } from "express";

interface TMeta {
  page: number;
  limit: number;
  total: number;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T | null;
}

export const sendResponse = <T>(
  res: Response,
  data: TResponse<T>,
) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    ...(data.meta && { meta: data.meta }),
    data: data.data,
  });
};