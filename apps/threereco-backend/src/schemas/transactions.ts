import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { bigintNumber, decimalNumber } from '@/lib/types';

import { transactionType } from './enums/transaction-type';
import { materials } from './materials';
import { products } from './products';
import { users } from './users';

export const transactions = pgTable('transactions', {
  id: text().primaryKey().notNull(),
  buyerId: text()
    .notNull()
    .references(() => users.id),
  sellerId: text()
    .notNull()
    .references(() => users.id),
  materialId: text()
    .notNull()
    .references(() => materials.id),
  productId: text()
    .notNull()
    .references(() => products.id),
  type: transactionType().notNull(),
  weight: bigintNumber().notNull(),
  amount: decimalNumber().notNull(),
  sellerAccepted: boolean().notNull().default(false),
  sellerDeclined: boolean().notNull().default(false),
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
