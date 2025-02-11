import { relations } from 'drizzle-orm';

import { materials } from '../materials';
import { products } from '../products';
import { transactions } from '../transactions';
import { users } from '../users';

export const transactionBuyer = relations(transactions, ({ one }) => ({
  buyer: one(users, {
    fields: [transactions.buyerId],
    references: [users.id],
  }),
}));

export const transactionSeller = relations(transactions, ({ one }) => ({
  seller: one(users, {
    fields: [transactions.sellerId],
    references: [users.id],
  }),
}));

export const transactionMaterial = relations(transactions, ({ one }) => ({
  material: one(materials, {
    fields: [transactions.materialId],
    references: [materials.id],
  }),
}));

export const transactionProduct = relations(transactions, ({ one }) => ({
  product: one(products, {
    fields: [transactions.productId],
    references: [products.id],
  }),
}));
