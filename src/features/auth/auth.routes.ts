import { Router } from 'express';
import * as authController from './auth.controller';
import { validate } from '../../middlewares/validation';
import { loginSchema, refreshTokenSchema } from './auth.validation';
import { z } from 'zod';

const router = Router();

// Login route
router.post(
  '/login',
  validate(
    z.object({
      body: loginSchema,
    }),
  ),
  authController.login,
);

// Token refresh route
router.post(
  '/refresh-token',
  validate(
    z.object({
      body: refreshTokenSchema,
    }),
  ),
  authController.refreshToken,
);

export default router;
