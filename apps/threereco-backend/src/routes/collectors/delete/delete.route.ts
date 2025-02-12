import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';

export const deleteCollectorRoute = createRoute({
  path: '/collectors/{id}',
  method: 'delete',
  tags: [TAGS.COLLECTORS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: {
      content: {
        'text/plain': {
          schema: z.string().default('ok'),
        },
      },
      description: 'The collector was deleted.',
    },
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The collector was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['collector']),
});

export type DeleteCollectorRoute = typeof deleteCollectorRoute;
