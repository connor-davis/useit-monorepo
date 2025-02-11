import { Context, Next } from 'hono';

import HttpStatus from '@/lib/http-status';

export const authorized = async (context: Context, next: Next) => {
  const session = context.get('session');

  if (!session)
    return context.json(
      {
        message: 'You are not authorized to access this endpoint.',
      },
      HttpStatus.UNAUTHORIZED
    );

  await next();
};
