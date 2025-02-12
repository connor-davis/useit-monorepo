import { createRoute } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';
import { insertTransaction, selectTransaction } from '@/models/transactions';

export const createTransactionRoute = createRoute({
  path: '/transactions',
  method: 'post',
  tags: [TAGS.TRANSACTIONS.name],
  request: {
    body: jsonContent(
      insertTransaction,
      "The new transactions's data payload."
    ),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(
      selectTransaction,
      "The new transactions's data payload."
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['business']),
});

export type CreateTransactionRoute = typeof createTransactionRoute;
