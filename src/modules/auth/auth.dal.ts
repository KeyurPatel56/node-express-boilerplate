import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { userSchema } from '../../db/schemas';
import logger from '../../utils/logger';

export const findUserByEmail = async (email: string) => {
  try {
    const normalizedEmail = email.toLowerCase();
    return await db
      .select()
      .from(userSchema.users)
      .where(eq(userSchema.users.email, normalizedEmail))
      .limit(1);
  } catch (error) {
    logger.error('Error finding user by email', { email, error });
    throw new Error('Database error occurred while finding user by email');
  }
};

export const findUserById = async (userId: number) => {
  try {
    return await db
      .select()
      .from(userSchema.users)
      .where(eq(userSchema.users.id, userId))
      .limit(1);
  } catch (error) {
    logger.error('Error finding user by ID', { userId, error });
    throw new Error('Database error occurred while finding user by ID');
  }
};
