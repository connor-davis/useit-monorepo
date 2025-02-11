import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from '@/schemas/users';

import { selectBusiness } from './businesses';
import { selectCollector } from './collectors';

export const selectUser = createSelectSchema(users).extend({
  business: selectBusiness.optional(),
  collector: selectCollector.optional(),
});
export const selectUsers = z.array(selectUser);
