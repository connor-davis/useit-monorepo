import { createRoute } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';
import { insertProduct, selectProduct } from '@/models/products';

export const createProductRoute = createRoute({
  path: '/products',
  method: 'post',
  tags: [TAGS.PRODUCTS.name],
  request: {
    body: jsonContent(insertProduct, "The new product's data payload."),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(
      selectProduct,
      "The new product's data payload."
    ),
    [HttpStatus.CONFLICT]: jsonContent(
      createMessageObjectSchema(
        'There is already a product with that material.'
      ),
      'The conflict error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['business']),
});

export type CreateProductRoute = typeof createProductRoute;
