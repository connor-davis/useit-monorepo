import { Context, Next } from 'hono';

import HttpStatus from '@/lib/http-status';
import { ThreeApiConfig } from '@/lib/types';

export const authorized = async (
  context: Context<ThreeApiConfig>,
  next: Next,
  roles?: string[]
) => {
  const session = context.get('session');
  const user = context.get('user');

  if (!session || !user || !user.role)
    return context.json(
      {
        message: 'You are not authorized to access this endpoint.',
      },
      HttpStatus.UNAUTHORIZED
    );

  if (roles && !roles.includes(user.role))
    return context.json(
      {
        message: 'You do not have permission to access this endpoint.',
      },
      HttpStatus.UNAUTHORIZED
    );

  await next();
};
