import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../../utils/password';
import { UserCreate, UserUpdate } from './user.validation';
import { notFoundError } from '../../utils/errorUtils';

/**
 * Get all users from database
 * @returns Array of all users
 */
export const getAllUsers = async () => {
  return db.select().from(users);
};

/**
 * Get a single user by ID
 * @param id User ID
 * @returns User object or null if not found
 */
export const getUserById = async (id: number) => {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length ? result[0] : null;
};

/**
 * Create a new user
 * @param userData User data to create
 * @returns Created user object (without password)
 */
export const createUser = async (userData: UserCreate) => {
  // Hash the password before storing it
  const hashedPassword = await hashPassword(userData.password);

  const newUser = await db
    .insert(users)
    .values({
      ...userData,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return newUser[0];
};

/**
 * Update an existing user
 * @param id User ID
 * @param userData User data to update
 * @returns Updated user object (without password)
 * @throws NotFoundError if user not found
 */
export const updateUser = async (id: number, userData: UserUpdate) => {
  // If password is provided, hash it before storing
  if (userData.password) {
    userData.password = await hashPassword(userData.password);
  }

  const updatedUser = await db
    .update(users)
    .set({
      ...userData,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  if (updatedUser.length === 0) {
    throw notFoundError(`User with ID ${id} not found`);
  }

  return updatedUser[0];
};

/**
 * Delete a user by ID
 * @param id User ID
 * @throws NotFoundError if user not found
 */
export const deleteUser = async (id: number) => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  if (deletedUser.length === 0) {
    throw notFoundError(`User with ID ${id} not found`);
  }
};
