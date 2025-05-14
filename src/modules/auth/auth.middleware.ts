import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../utils/token';
import { unauthorizedError } from '../../utils/errorUtils';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

/**
 * Middleware to authenticate requests using JWT
 * Extracts the token from Authorization header and verifies it
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw unauthorizedError('No token provided');
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Verify the token
    const payload = verifyAccessToken(token);

    if (!payload) {
      throw unauthorizedError('Invalid or expired token');
    }

    // Set the user information in the request object
    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    throw error;
  }
};
