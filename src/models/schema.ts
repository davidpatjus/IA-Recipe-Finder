import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

// Definición de la tabla de usuarios
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  user: text('user').notNull().unique(),
  credits: integer('credits').default(0),
  maxUsageCredits: integer('max_usage_credits').default(50000),
  createdAt: timestamp('created_at').defaultNow(),
});
