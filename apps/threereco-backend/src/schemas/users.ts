import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { bigintNumber } from '@/lib/types';

export const users = pgTable('users', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean().notNull().default(true),
  image: text(),
  twoFactorEnabled: boolean().notNull().default(false),
  role: text(),
  banned: boolean(),
  banReason: text(),
  banExpires: bigintNumber(),
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
