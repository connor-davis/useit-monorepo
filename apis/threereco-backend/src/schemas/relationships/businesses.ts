import { relations } from 'drizzle-orm';

import { businesses } from '../businesses';
import { users } from '../users';

export const businessUser = relations(businesses, ({ one }) => ({
  user: one(users, {
    fields: [businesses.userId],
    references: [users.id],
  }),
}));
