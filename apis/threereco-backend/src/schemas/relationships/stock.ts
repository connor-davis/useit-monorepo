import { relations } from 'drizzle-orm';

import { businesses } from '../businesses';
import { products } from '../products';
import { stock } from '../stock';

export const stockProduct = relations(stock, ({ one }) => ({
  product: one(products, {
    fields: [stock.productId],
    references: [products.id],
  }),
}));

export const stockBusiness = relations(stock, ({ one }) => ({
  business: one(businesses, {
    fields: [stock.businessId],
    references: [businesses.id],
  }),
}));

export const businessStock = relations(businesses, ({ many }) => ({
  stock: many(stock),
}));
