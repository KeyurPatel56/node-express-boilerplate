import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import { notFoundError } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUsers = await userService.getAllUsers();

    res.success(
      {
        results: allUsers.length,
        users: allUsers,
      },
      StatusCodes.OK,
      req.t('usersFetched'),
    );
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

    res.success({ user }, StatusCodes.OK, req.t('userFetched'));
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

    res.success({ user: newUser }, StatusCodes.CREATED, req.t('userCreated'));
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

    res.success({ user: updatedUser }, StatusCodes.OK, req.t('userUpdated'));
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

    res.success(null, StatusCodes.OK, req.t('userDeleted'));
  } catch (error) {
    next(error);
  }
};
