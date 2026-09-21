import type { Request, RequestHandler } from "express";
import { sendResponse, type TResponse } from "./response";

export const asyncHandler = (
  handler: (req: Request) => Promise<TResponse<unknown>>,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const result = await handler(req);

      return sendResponse(res, result);
    } catch (error) {
      next(error);
    }
  };
};