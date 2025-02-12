import { createRoute } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';
import { selectAllStock } from '@/models/stock';

export const viewStockRoute = createRoute({
  path: '/stock',
  method: 'get',
  tags: [TAGS.STOCK.name],
  responses: {
    [HttpStatus.OK]: jsonContent(selectAllStock, 'The stock list.'),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewStockRoute = typeof viewStockRoute;
