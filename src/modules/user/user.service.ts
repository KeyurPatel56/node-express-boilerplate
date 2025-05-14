import * as userDAL from './user.dal';
import { hashPassword } from '../../utils/password';
import { UserCreate, UserUpdate } from './user.validation';
import { notFoundError } from '../../utils/errorUtils';

/**
 * Get all users from database
 * @returns Array of all users
 */
export const getAllUsers = async () => {
  return userDAL.getAllUsers();
};

/**
 * Get a single user by ID
 * @param id User ID
 * @returns User object or null if not found
 */
export const getUserById = async (id: number) => {
  const user = await userDAL.getUserById(id);

  if (!user) {
    throw notFoundError(`User with ID ${id} not found`);
  }

  return user;
};

/**
 * Create a new user
 * @param userData User data to create
 * @returns Created user object (without password)
 */
export const createUser = async (userData: UserCreate) => {
  // Hash the password before storing it
  const hashedPassword = await hashPassword(userData.password);

  return userDAL.createUser({
    ...userData,
    password: hashedPassword,
  });
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

  const updatedUser = await userDAL.updateUserById(id, {
    ...userData,
    updatedAt: new Date(),
  });

  if (!updatedUser) {
    throw notFoundError(`User with ID ${id} not found`);
  }

  return updatedUser;
};

/**
 * Delete a user by ID
 * @param id User ID
 * @throws NotFoundError if user not found
 */
export const deleteUser = async (id: number) => {
  const deletedUser = await userDAL.deleteUserById(id);

  if (!deletedUser) {
    throw notFoundError(`User with ID ${id} not found`);
  }
};
