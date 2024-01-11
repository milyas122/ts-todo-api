import { Response } from "express";
import { AppError, BadRequest, STATUS_CODE } from "./custom-errors";

type Options = {
  logKey?: string;
  message?: string;
};

export async function errorHandler(
  response: Response,
  error: AppError | Error,
  { logKey, message }: Options
): Promise<Response> {
  let errorMessage = "internal server error";
  let statusCode = STATUS_CODE.INTERNAL_ERROR;

  if (error instanceof AppError) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  } else if (message) {
    errorMessage = "internal server error";
  }

  if (logKey && !(error instanceof BadRequest)) {
    // will use logging service like sentry or cloudwatch
    console.log(`Error (${logKey}): ${error}`);
  }
  return response.status(statusCode).json({
    error: errorMessage,
  });
}
