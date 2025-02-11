import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { decimalNumber } from '@/lib/types';

import { businesses } from './businesses';
import { products } from './products';

export const stock = pgTable('stock', {
  id: text().primaryKey().notNull(),
  businessId: text()
    .notNull()
    .references(() => businesses.id, { onDelete: 'cascade' }),
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
