import { Router } from 'express';
import * as userController from '../user/user.controller';
import { validate } from '../../middlewares/validation';
import { authenticate } from '../auth/auth.middleware';
import { userCreateSchema, userUpdateSchema } from './user.validation';
import { z } from 'zod';

const router = Router();

// Public routes
// POST create user (registration)
router.post(
  '/',
  validate(z.object({ body: userCreateSchema })),
  userController.createUser,
);

// Protected routes - require authentication
router.use(authenticate);

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get(
  '/:id',
  validate(z.object({ params: z.object({ id: z.string().regex(/^\d+$/) }) })),
  userController.getUserById,
);

// PATCH update user
router.patch(
  '/:id',
  validate(
    z.object({
      params: z.object({ id: z.string().regex(/^\d+$/) }),
      body: userUpdateSchema,
    }),
  ),
  userController.updateUser,
);

// DELETE user
router.delete(
  '/:id',
  validate(z.object({ params: z.object({ id: z.string().regex(/^\d+$/) }) })),
  userController.deleteUser,
);

export default router;
