import { createRoute, z } from '@hono/zod-openapi';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';

export const setRoleRoute = createRoute({
  path: '/onboarding/set-role/{role}',
  method: 'patch',
  tags: [TAGS.ONBOARDING.name],
  request: {
    params: z.object({
      role: z.enum(['business', 'collector', 'user']),
    }),
  },
  responses: {
    [HttpStatus.OK]: {
      content: {
        'text/plain': {
          schema: z.string().default('ok'),
        },
      },
      description: 'The role was set.',
    },
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['user', 'business', 'collector']),
});

export type SetRoleRoute = typeof setRoleRoute;
