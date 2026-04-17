import { Response } from "express";
import { AppError } from "../../shared/errors/AppError";

export const successResponse = (
  res: Response,
  data: any,
  statusCode: number = 200,
): void => {
  res.status(statusCode).json({
    success: true,
    ...data,
  });
};

export const errorResponse = (res: Response, error: any): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
};

export const validationErrorResponse = (
  res: Response,
  message: string,
): void => {
  res.status(400).json({
    success: false,
    error: message,
  });
};
