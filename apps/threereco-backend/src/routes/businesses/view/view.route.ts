import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectBusiness, selectBusinesses } from '@/models/businesses';

export const viewBusinessesRoute = createRoute({
  path: '/businesses',
  method: 'get',
  tags: [TAGS.BUSINESSES.name],
  responses: {
    [HttpStatus.OK]: jsonContent(selectBusinesses, 'The businesses list.'),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewBusinessesRoute = typeof viewBusinessesRoute;

export const viewBusinessRoute = createRoute({
  path: '/businesses/{id}',
  method: 'get',
  tags: [TAGS.BUSINESSES.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(selectBusiness, 'The business data payload.'),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The business was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewBusinessRoute = typeof viewBusinessRoute;
