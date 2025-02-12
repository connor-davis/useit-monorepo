import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectProduct, selectProducts } from '@/models/products';

export const viewProductsRoute = createRoute({
  path: '/products',
  method: 'get',
  tags: [TAGS.PRODUCTS.name],
  responses: {
    [HttpStatus.OK]: jsonContent(selectProducts, 'The product list.'),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewProductsRoute = typeof viewProductsRoute;

export const viewProductRoute = createRoute({
  path: '/products/{id}',
  method: 'get',
  tags: [TAGS.PRODUCTS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(selectProduct, "The product's data payload."),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The product was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewProductRoute = typeof viewProductRoute;
