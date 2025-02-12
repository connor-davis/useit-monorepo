import { pgTable, text } from 'drizzle-orm/pg-core';

import { users } from './users';

export const twoFactors = pgTable('two_factors', {
  userId: text()
    .primaryKey()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  secret: text(),
  backupCode: text(),
});
