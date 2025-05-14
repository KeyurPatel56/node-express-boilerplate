import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import i18next from 'i18next';

declare module 'express-serve-static-core' {
  interface Response {
    success: (
      data?: any,
      httpStatus?: number,
      message?: string,
      headers?: Record<string, any>,
    ) => void;
    error: (error: any, statusCode?: number, message?: string) => void;
    t: (key: string, options?: any) => string;
  }
}

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = (
    data = [],
    httpStatus: number = StatusCodes.OK,
    message: string = '',
    headers: Record<string, any> = {},
  ) => {
    if (Object.keys(headers).length > 0) {
      return res.set(headers).status(httpStatus).json({
        status: true,
        message,
        data,
      });
    }

    return res.status(httpStatus).send({
      status: true,
      message,
      data,
    });
  };

  res.error = (
    error: any,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = 'An error occurred',
  ) => {
    res.status(statusCode).json({
      success: false,
      message,
      error: typeof error === 'string' ? { message: error } : error,
    });
  };

  res.t = (key: string, options?: any) => {
    return i18next.t(key, {
      lng: req.headers['accept-language'],
      ...options,
    }) as string;
  };

  next();
};
