import { relations } from 'drizzle-orm';

import { businesses } from '../businesses';
import { materials } from '../materials';
import { products } from '../products';

export const productMaterial = relations(products, ({ one }) => ({
  material: one(materials, {
    fields: [products.materialId],
    references: [materials.id],
  }),
}));

export const productBusiness = relations(products, ({ one }) => ({
  business: one(businesses, {
    fields: [products.businessId],
    references: [businesses.id],
  }),
}));
