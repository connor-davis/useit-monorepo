import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectCollector, updateCollector } from '@/models/collectors';

export const updateCollectorRoute = createRoute({
  path: '/collectors/{id}',
  method: 'patch',
  tags: [TAGS.COLLECTORS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
    body: jsonContent(updateCollector, "The updated collector's data payload."),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectCollector,
      "The updated collector's data payload."
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The collector was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['collector']),
});

export type UpdateCollectorRoute = typeof updateCollectorRoute;
