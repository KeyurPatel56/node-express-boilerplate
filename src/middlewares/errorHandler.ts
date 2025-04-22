import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import logger from '../utils/logger';
import { AppErrorType } from '../utils/errorUtils';
import config from '../config/server.config';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
  err: Error | AppErrorType | ZodError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errorDetails: any = {};

  // Logging
  logger.error({
    message: 'Error caught by error handler',
    error: (err as any).message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Function-based error
  if (typeof err === 'object' && 'statusCode' in err && 'message' in err) {
    statusCode = err.statusCode;
    message = err.message;
    if (err.errors) {
      errorDetails.errors = err.errors;
    }
  }
  // Zod validation error
  else if (err instanceof ZodError) {
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    message = 'Validation Error';
    errorDetails.errors = err.format();
  }
  // JSON parse error
  else if (err.name === 'SyntaxError') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Invalid JSON';
  }

  // Response
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(config.isProduction ? {} : { stack: err.stack }),
    ...errorDetails,
  });
};
