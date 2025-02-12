import { createRoute } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';
import { insertBusiness, selectBusiness } from '@/models/businesses';

export const createBusinessRoute = createRoute({
  path: '/businesses',
  method: 'post',
  tags: [TAGS.BUSINESSES.name],
  request: {
    body: jsonContent(insertBusiness, "The new business's data payload."),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(
      selectBusiness,
      "The new business's data payload."
    ),
    [HttpStatus.CONFLICT]: jsonContent(
      createMessageObjectSchema('There is already an existing business.'),
      'The conflict error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['business']),
});

export type CreateBusinessRoute = typeof createBusinessRoute;
