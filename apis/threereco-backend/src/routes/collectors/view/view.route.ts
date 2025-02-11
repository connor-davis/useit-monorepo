import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectCollector, selectCollectors } from '@/models/collectors';

export const viewCollectorsRoute = createRoute({
  path: '/collectors',
  method: 'get',
  tags: [TAGS.COLLECTORS.name],
  responses: {
    [HttpStatus.OK]: jsonContent(selectCollectors, 'The collectors list.'),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewCollectorsRoute = typeof viewCollectorsRoute;

export const viewCollectorRoute = createRoute({
  path: '/collectors/{id}',
  method: 'get',
  tags: [TAGS.COLLECTORS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectCollector,
      'The collector data payload.'
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The collector was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewCollectorRoute = typeof viewCollectorRoute;
