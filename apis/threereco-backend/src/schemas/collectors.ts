import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users';

export const collectors = pgTable('collectors', {
  id: text().primaryKey().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id),
  name: text().notNull(),
  idNumber: text().notNull(),
  phoneNumber: text().notNull(),
  address: text().notNull(),
  city: text().notNull(),
  province: text().notNull(),
  zipCode: text().notNull(),
  paymentName: text().notNull(),
  paymentAccountHolder: text().notNull(),
  paymentAccountNumber: text().notNull(),
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
