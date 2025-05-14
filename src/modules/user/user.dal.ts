import { db } from '../../db';
import { userSchema } from '../../db/schemas';
import { eq } from 'drizzle-orm';
import { InferInsertModel } from 'drizzle-orm';
import logger from '../../utils/logger';

// Define the type for inserting a user
export type UserInsert = InferInsertModel<typeof userSchema.users>;

export const getAllUsers = async () => {
  try {
    return await db.select().from(userSchema.users);
  } catch (error) {
    logger.error('Error fetching all users', { error });
    throw new Error('Database error occurred while fetching all users');
  }
};

export const getUserById = async (userId: number) => {
  try {
    const result = await db
      .select()
      .from(userSchema.users)
      .where(eq(userSchema.users.id, userId))
      .limit(1);
    return result.length ? result[0] : null;
  } catch (error) {
    logger.error('Error fetching user by ID', { userId, error });
    throw new Error('Database error occurred while fetching user by ID');
  }
};

export const createUser = async (userData: UserInsert) => {
  try {
    return await db.insert(userSchema.users).values(userData).returning({
      id: userSchema.users.id,
      name: userSchema.users.name,
      email: userSchema.users.email,
      createdAt: userSchema.users.createdAt,
      updatedAt: userSchema.users.updatedAt,
    });
  } catch (error) {
    logger.error('Error creating user', { userData, error });
    throw new Error('Database error occurred while creating user');
  }
};

export const updateUserById = async (
  userId: number,
  userData: Partial<UserInsert>,
) => {
  try {
    return await db
      .update(userSchema.users)
      .set(userData)
      .where(eq(userSchema.users.id, userId))
      .returning({
        id: userSchema.users.id,
        name: userSchema.users.name,
        email: userSchema.users.email,
        createdAt: userSchema.users.createdAt,
        updatedAt: userSchema.users.updatedAt,
      });
  } catch (error) {
    logger.error('Error updating user by ID', { userId, userData, error });
    throw new Error('Database error occurred while updating user by ID');
  }
};

export const deleteUserById = async (userId: number) => {
  try {
    return await db
      .delete(userSchema.users)
      .where(eq(userSchema.users.id, userId))
      .returning();
  } catch (error) {
    logger.error('Error deleting user by ID', { userId, error });
    throw new Error('Database error occurred while deleting user by ID');
  }
};
