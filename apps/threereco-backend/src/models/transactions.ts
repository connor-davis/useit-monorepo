import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { transactions } from '@/schemas/transactions';

export const selectTransaction = createSelectSchema(transactions);
export const selectTransactions = z.array(selectTransaction);

export const insertTransaction = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTransaction = createInsertSchema(transactions).partial();
