import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { stock } from '@/schemas/stock';

export const selectStock = createSelectSchema(stock);
export const selectAllStock = z.array(selectStock);
