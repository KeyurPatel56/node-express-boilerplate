import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import i18next from 'i18next';

declare module 'express-serve-static-core' {
  interface Response {
    success: (data: any) => void;
    error: (error: any, statusCode?: number) => void;
    t: (key: string, options?: any) => string;
  }
}

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = (
    res,
    data = [],
    message = '',
    httpStatus = StatusCodes.OK,
    headers = {},
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

  res.error = (error: any, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
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
