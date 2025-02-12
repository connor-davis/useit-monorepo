import { relations } from 'drizzle-orm';

import { collectors } from '../collectors';
import { users } from '../users';

export const collectorUser = relations(collectors, ({ one }) => ({
  user: one(users, {
    fields: [collectors.userId],
    references: [users.id],
  }),
}));
