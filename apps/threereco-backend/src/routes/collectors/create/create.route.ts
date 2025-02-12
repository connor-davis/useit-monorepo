import { createRoute } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';
import { insertCollector, selectCollector } from '@/models/collectors';

export const createCollectorRoute = createRoute({
  path: '/collectors',
  method: 'post',
  tags: [TAGS.COLLECTORS.name],
  request: {
    body: jsonContent(insertCollector, "The new collector's data payload."),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(
      selectCollector,
      "The new collector's data payload."
    ),
    [HttpStatus.CONFLICT]: jsonContent(
      createMessageObjectSchema('There is already an existing collector.'),
      'The conflict error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['collector']),
});

export type CreateCollectorRoute = typeof createCollectorRoute;
