import * as authDAL from './auth.dal';
import { forbiddenError, unauthorizedError } from '../../utils/errorUtils';
import { comparePassword } from '../../utils/password';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/token';

/**
 * Authenticate a user by email and password
 * @param email User's email
 * @param password User's plain text password
 * @returns User object without password if authentication succeeds
 * @throws UnauthorizedError if authentication fails
 */
export const authenticateUser = async (email: string, password: string) => {
  try {
    const result = await authDAL.findUserByEmail(email);

    if (result.length === 0) {
      throw unauthorizedError('Invalid email or password');
    }

    const user = result[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw unauthorizedError('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

/**
 * Login a user with email and password
 * @param email User's email
 * @param password User's plain text password
 * @returns User data and tokens
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await authenticateUser(email, password);

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Refresh an access token using a valid refresh token
 * @param refreshToken The refresh token
 * @returns New access token and refresh token pair
 */
export const refreshTokens = async (refreshToken: string) => {
  try {
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      throw forbiddenError('Invalid refresh token');
    }

    const result = await authDAL.findUserById(payload.userId);

    if (result.length === 0) {
      throw unauthorizedError('User not found');
    }

    const user = result[0];

    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const newRefreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw error;
  }
};
