import { z } from 'zod';
import { generateSchema } from '@anatine/zod-openapi';

const aZodSchema = z.object({
  name: z.string().min(1).openapi({ example: 'John Doe' }),
  email: z.string().email().openapi({ example: 'john@example.com' }),
  password: z.string().min(8).openapi({ example: 'password123' }),
});

const createUserSchema = generateSchema(aZodSchema, true, '3.1');

export default createUserSchema;
