import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { businesses } from '@/schemas/businesses';

export const selectBusiness = createSelectSchema(businesses);
export const selectBusinesses = z.array(selectBusiness);

export const insertBusiness = createInsertSchema(businesses).extend({
  id: z.string().optional(),
});

export const updateBusiness = createInsertSchema(businesses).partial();
