import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { materials } from '@/schemas/materials';

export const selectMaterial = createSelectSchema(materials);
export const selectMaterials = z.array(selectMaterial);

export const insertMaterial = createInsertSchema(materials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateMaterial = createInsertSchema(materials).partial();
