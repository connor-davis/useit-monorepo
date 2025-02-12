import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const materials = pgTable('materials', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  gwCode: text().notNull(),
  carbonFactor: text().notNull(),
  createdAt: timestamp({
    mode: 'date',
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({
    mode: 'date',
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
