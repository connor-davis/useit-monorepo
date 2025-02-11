import { relations } from 'drizzle-orm';

import { businesses } from '../businesses';
import { collectors } from '../collectors';
import { users } from '../users';

export const userBusiness = relations(users, ({ one }) => ({
  business: one(businesses, {
    fields: [users.id],
    references: [businesses.userId],
  }),
}));

export const userCollector = relations(users, ({ one }) => ({
  collector: one(collectors, {
    fields: [users.id],
    references: [collectors.userId],
  }),
}));
