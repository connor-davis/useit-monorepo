import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectProduct, updateProduct } from '@/models/products';

export const updateProductRoute = createRoute({
  path: '/products/{id}',
  method: 'patch',
  tags: [TAGS.PRODUCTS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
    body: jsonContent(updateProduct, "The updated products's data payload."),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectProduct,
      "The updated product's data payload."
    ),
    [HttpStatus.CONFLICT]: jsonContent(
      createMessageObjectSchema(
        'There is already a product with that material.'
      ),
      'The conflict error message.'
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The product was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['business']),
});

export type UpdateProductRoute = typeof updateProductRoute;
