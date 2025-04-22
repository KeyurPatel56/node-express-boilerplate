import { z } from 'zod';

// User validation schemas
export const userCreateSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const userUpdateSchema = userCreateSchema.partial();

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Post validation schemas
export const postCreateSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10),
  userId: z.number().int().positive(),
});

export const postUpdateSchema = postCreateSchema.partial();

// Types
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type PostCreate = z.infer<typeof postCreateSchema>;
export type PostUpdate = z.infer<typeof postUpdateSchema>;
