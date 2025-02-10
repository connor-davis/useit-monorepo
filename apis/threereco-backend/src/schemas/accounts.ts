import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const accounts = pgTable('accounts', {
  id: text().primaryKey().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  accessTokenExpiresAt: timestamp({
    mode: 'date',
    precision: 6,
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp({
    mode: 'date',
    precision: 6,
    withTimezone: true,
  }),
  scope: text(),
  idToken: text(),
  password: text(),
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
