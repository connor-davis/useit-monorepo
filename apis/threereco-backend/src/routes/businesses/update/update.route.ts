import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectBusiness, updateBusiness } from '@/models/businesses';

export const updateBusinessRoute = createRoute({
  path: '/businesses/{id}',
  method: 'patch',
  tags: [TAGS.BUSINESSES.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
    body: jsonContent(updateBusiness, "The updated business's data payload."),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectBusiness,
      "The updated business's data payload."
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The business was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type UpdateBusinessRoute = typeof updateBusinessRoute;
