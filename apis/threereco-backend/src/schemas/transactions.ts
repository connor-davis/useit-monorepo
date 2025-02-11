import { pgTable, text } from 'drizzle-orm/pg-core';

export const transactions = pgTable('transactions', {
  id: text().primaryKey().notNull(),
});
