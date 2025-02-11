import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { decimalNumber } from '@/lib/types';

import { businesses } from './businesses';
import { materials } from './materials';

export const products = pgTable('products', {
  id: text().primaryKey().notNull(),
  materialId: text()
    .notNull()
    .references(() => materials.id),
  businessId: text()
    .notNull()
    .references(() => businesses.id),
  value: decimalNumber().notNull(),
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
