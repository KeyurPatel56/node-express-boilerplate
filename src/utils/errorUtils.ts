import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

export type AppErrorType = {
  name: string;
  message: string;
  statusCode: number;
  errors?: any;
  stack?: string;
};

function createAppError(
  name: string,
  message: string,
  statusCode: number,
  errors?: any,
): AppErrorType {
  const error: AppErrorType = {
    name,
    message,
    statusCode,
    errors,
    stack: new Error().stack,
  };
  return error;
}

// 400 - Bad Request
export function badRequestError(message = 'Bad Request', errors?: any) {
  return createAppError(
    'BadRequestError',
    message,
    StatusCodes.BAD_REQUEST,
    errors,
  );
}

// 401 - Unauthorized
export function unauthorizedError(message = 'Unauthorized') {
  return createAppError('UnauthorizedError', message, StatusCodes.UNAUTHORIZED);
}

// 403 - Forbidden
export function forbiddenError(message = 'Forbidden') {
  return createAppError('ForbiddenError', message, StatusCodes.FORBIDDEN);
}

// 404 - Not Found
export function notFoundError(message = 'Resource not found') {
  return createAppError('NotFoundError', message, StatusCodes.NOT_FOUND);
}

// 409 - Conflict
export function conflictError(message = 'Conflict with existing resource') {
  return createAppError('ConflictError', message, StatusCodes.CONFLICT);
}

// 422 - Validation Error
export function validationError(
  message = 'Validation Error',
  errors?: ZodError,
) {
  return createAppError(
    'ValidationError',
    message,
    StatusCodes.UNPROCESSABLE_ENTITY,
    errors,
  );
}
