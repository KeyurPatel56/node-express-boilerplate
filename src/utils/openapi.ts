import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';
import {
  userCreateSchema,
  userUpdateSchema,
} from '../modules/user/user.validation';
import {
  loginSchema,
  refreshTokenSchema,
} from '../modules/auth/auth.validation';

// Generate OpenAPI schemas from User Zod schemas
export const UserCreateOpenApiSchema = generateSchema(userCreateSchema);
export const UserUpdateOpenApiSchema = generateSchema(userUpdateSchema);

// Generate OpenAPI schemas from Auth Zod schemas
export const LoginRequestOpenApiSchema = generateSchema(loginSchema);
export const RefreshTokenRequestOpenApiSchema =
  generateSchema(refreshTokenSchema);

// Define response schemas
const userResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const UserResponseOpenApiSchema = generateSchema(userResponseSchema);

const errorResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  errors: z.record(z.any()).optional(),
});

export const ErrorResponseOpenApiSchema = generateSchema(errorResponseSchema);

const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const TokenResponseOpenApiSchema = generateSchema(tokenResponseSchema);

const loginResponseSchema = z.object({
  user: userResponseSchema,
  tokens: tokenResponseSchema,
});

export const LoginResponseOpenApiSchema = generateSchema(loginResponseSchema);
