import jwt from 'jsonwebtoken';
import serverConfig from '../config/server.config';

// Define token payload interface
interface TokenPayload {
  userId: number;
  email: string;
}

/**
 * Generate JWT access token
 * @param payload User information to include in the token
 * @returns JWT access token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, serverConfig.jwtAccessSecret as jwt.Secret, {
    expiresIn: serverConfig.jwtAccessExpiration as jwt.SignOptions['expiresIn'],
  });
};

/**
 * Generate JWT refresh token
 * @param payload User information to include in the token
 * @returns JWT refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, serverConfig.jwtRefreshSecret as jwt.Secret, {
    expiresIn:
      serverConfig.jwtRefreshExpiration as jwt.SignOptions['expiresIn'],
  });
};

/**
 * Verify JWT access token
 * @param token JWT access token
 * @returns Decoded token payload or null if invalid
 */
export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, serverConfig.jwtAccessSecret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Verify JWT refresh token
 * @param token JWT refresh token
 * @returns Decoded token payload or null if invalid
 */
export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, serverConfig.jwtRefreshSecret) as TokenPayload;
  } catch (error) {
    return null;
  }
};
