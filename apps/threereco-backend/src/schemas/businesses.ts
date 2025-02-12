import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { businessType } from './enums/business-type';
import { users } from './users';

export const businesses = pgTable('businesses', {
  id: text().primaryKey().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: businessType().notNull(),
  description: text().notNull(),
  phoneNumber: text().notNull(),
  address: text().notNull(),
  city: text().notNull(),
  province: text().notNull(),
  zipCode: text().notNull(),
  verified: boolean().notNull().default(false),
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
