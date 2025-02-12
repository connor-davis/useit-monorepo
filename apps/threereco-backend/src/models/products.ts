import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { products } from '@/schemas/products';

export const selectProduct = createSelectSchema(products);
export const selectProducts = z.array(selectProduct);

export const insertProduct = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProduct = createInsertSchema(products).partial();
