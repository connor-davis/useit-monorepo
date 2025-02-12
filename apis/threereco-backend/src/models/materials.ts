import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { materials } from '@/schemas/materials';

export const selectMaterial = createSelectSchema(materials);
export const selectMaterials = z.array(selectMaterial);

export const insertMaterial = createInsertSchema(materials).extend({
  id: z.string().optional(),
});

export const updateMaterial = createInsertSchema(materials).partial();
