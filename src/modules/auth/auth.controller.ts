import { Request, Response, NextFunction } from 'express';
import { loginUser, refreshTokens } from './auth.service';
import { StatusCodes } from 'http-status-codes';

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

    res.success(result, StatusCodes.OK, req.t('loginSuccess'));
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
      return res.error(
        'Refresh token is required',
        StatusCodes.BAD_REQUEST,
        req.t('missingRefreshToken'),
      );
    }

    const tokens = await refreshTokens(refreshToken);

    res.success({ tokens }, StatusCodes.OK, req.t('tokensRefreshed'));
  } catch (error) {
    next(error);
  }
};
