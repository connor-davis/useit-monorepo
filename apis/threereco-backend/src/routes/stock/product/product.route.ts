import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectStock } from '@/models/stock';

export const viewProductStockRoute = createRoute({
  path: '/stock/product/{productId}',
  method: 'get',
  tags: [TAGS.STOCK.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(selectStock, 'The stock data payload.'),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The stock was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewProductStockRoute = typeof viewProductStockRoute;
