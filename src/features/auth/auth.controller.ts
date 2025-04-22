import { Request, Response, NextFunction } from 'express';
import { loginUser, refreshTokens } from './auth.service';

/**
 * Login controller - authenticates user and returns tokens
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Token refresh controller - issues new access and refresh tokens
 */
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        status: 'error',
        message: 'Refresh token is required',
      });
    }

    const tokens = await refreshTokens(refreshToken);

    res.status(200).json({
      status: 'success',
      data: { tokens },
    });
  } catch (error) {
    next(error);
  }
};
