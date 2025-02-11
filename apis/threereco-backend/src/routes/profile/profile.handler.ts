import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { users } from '@/schemas/users';

import { ProfileRoute } from './profile.route';

export const profileHandler: ThreeApiHandler<ProfileRoute> = async (
  context
) => {
  const session = context.get('session');

  const sessionUser = await database.query.users.findFirst({
    where: eq(users.id, session!.userId),
    with: {
      business: true,
      collector: true,
    },
  });

  if (!sessionUser) {
    return context.json(
      {
        message: 'The user profile was not found.',
      },
      HttpStatus.NOT_FOUND
    );
  }

  return context.json(sessionUser, HttpStatus.OK);
};
