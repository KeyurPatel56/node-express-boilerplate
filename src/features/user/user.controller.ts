import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import { notFoundError } from '../../utils/errorUtils';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUsers = await userService.getAllUsers();

    res.status(200).json({
      status: 'success',
      results: allUsers.length,
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(parseInt(id));

    if (!user) {
      throw notFoundError(`User with ID ${id} not found`);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.body;

    const newUser = await userService.createUser(userData);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = await userService.updateUser(parseInt(id), userData);

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await userService.deleteUser(parseInt(id));

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
