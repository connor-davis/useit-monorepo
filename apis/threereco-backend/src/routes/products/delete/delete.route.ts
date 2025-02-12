import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';

export const deleteProductRoute = createRoute({
  path: '/products/{id}',
  method: 'delete',
  tags: [TAGS.PRODUCTS.name],
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
      description: 'The product was deleted.',
    },
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The product was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['business']),
});

export type DeleteProductRoute = typeof deleteProductRoute;
