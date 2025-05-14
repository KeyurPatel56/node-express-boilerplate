import { z } from 'zod';

// User validation schemas
export const userCreateSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const userUpdateSchema = userCreateSchema.partial();

// Types
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
