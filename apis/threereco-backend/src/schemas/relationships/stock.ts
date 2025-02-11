import { relations } from 'drizzle-orm';

import { products } from '../products';
import { stock } from '../stock';

export const stockProduct = relations(stock, ({ one }) => ({
  product: one(products, {
    fields: [stock.productId],
    references: [products.id],
  }),
}));
