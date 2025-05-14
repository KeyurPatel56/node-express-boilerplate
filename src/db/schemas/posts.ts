import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { userSchema } from './index';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  userId: serial('user_id').references(() => userSchema.users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
