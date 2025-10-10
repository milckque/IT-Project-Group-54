import type { Response } from "express";
import type { ApiResponse } from "../../types/api";

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = 200,
) => {
  const response: ApiResponse<T> = {
    success: true,
    ...(data !== undefined && { data }),
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  error?: string,
  message?: string,
  statusCode: number = 500,
) => {
  const response: ApiResponse<null> = {
    success: false,
    error,
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
};
