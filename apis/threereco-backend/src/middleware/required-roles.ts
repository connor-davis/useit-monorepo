import { Context, Next } from 'hono';

import HttpStatus from '@/lib/http-status';
import { ThreeApiConfig } from '@/lib/types';

export const requiredRoles = async (
  roles: string[],
  context: Context<ThreeApiConfig>,
  next: Next
) => {
  const user = context.get('user');

  if (!user || !user.role || !roles.includes(user.role))
    return context.json(
      { message: 'You are not authorized to access this endpoint.' },
      HttpStatus.UNAUTHORIZED
    );

  await next();
};
