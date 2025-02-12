import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { users } from '@/schemas/users';

import { SetRoleRoute } from './set-role.route';

export const setRoleHandler: ThreeApiHandler<SetRoleRoute> = async (
  context
) => {
  const user = context.get('user');
  const { role } = context.req.valid('param');

  await database.update(users).set({ role }).where(eq(users.id, user!.id));

  return context.text('ok', HttpStatus.OK);
};
