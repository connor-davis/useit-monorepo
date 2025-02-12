import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { collectors } from '@/schemas/collectors';

export const selectCollector = createSelectSchema(collectors);
export const selectCollectors = z.array(selectCollector);

export const insertCollector = createInsertSchema(collectors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCollector = createInsertSchema(collectors).partial();
