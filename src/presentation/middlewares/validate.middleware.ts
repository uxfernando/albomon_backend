import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { validationErrorResponse } from "@/infrastructure/utils/response.util";

export const validateSchema = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => err.message).join(", ");
        validationErrorResponse(res, errorMessages);
        return;
      }
      validationErrorResponse(res, "Internal validation error");
    }
  };
};
