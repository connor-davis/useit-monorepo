import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { decimalNumber } from '@/lib/types';

import { products } from './products';

export const stock = pgTable('stock', {
  id: text().primaryKey().notNull(),
  productId: text()
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  weight: decimalNumber().notNull(),
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
