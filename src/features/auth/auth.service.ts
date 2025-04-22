import { db } from '../../db';
import { users } from '../../db/schema';
import { forbiddenError, unauthorizedError } from '../../utils/errorUtils';
import { comparePassword } from '../../utils/password';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/token';
import { eq } from 'drizzle-orm';

/**
 * Authenticate a user by email and password
 * @param email User's email
 * @param password User's plain text password
 * @returns User object without password if authentication succeeds
 * @throws UnauthorizedError if authentication fails
 */
export const authenticateUser = async (email: string, password: string) => {
  // Find user by email
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (result.length === 0) {
    throw unauthorizedError('Invalid email or password');
  }

  const user = result[0];

  // Compare provided password with stored hash
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw unauthorizedError('Invalid email or password');
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Login a user with email and password
 * @param email User's email
 * @param password User's plain text password
 * @returns User data and tokens
 */
export const loginUser = async (email: string, password: string) => {
  // Authenticate the user (reuse existing functionality)
  const user = await authenticateUser(email, password);

  // Generate tokens
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
};

/**
 * Refresh an access token using a valid refresh token
 * @param refreshToken The refresh token
 * @returns New access token and refresh token pair
 */
export const refreshTokens = async (refreshToken: string) => {
  // Verify the refresh token
  const payload = verifyRefreshToken(refreshToken);

  if (!payload) {
    throw forbiddenError('Invalid refresh token');
  }

  // Find the user to make sure they still exist
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId))
    .limit(1);

  if (result.length === 0) {
    throw unauthorizedError('User not found');
  }

  const user = result[0];

  // Generate new tokens
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
};
