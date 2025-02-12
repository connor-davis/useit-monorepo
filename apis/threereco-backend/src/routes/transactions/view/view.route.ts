import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectTransaction, selectTransactions } from '@/models/transactions';

export const viewTransactionsRoute = createRoute({
  path: '/transactions',
  method: 'get',
  tags: [TAGS.TRANSACTIONS.name],
  responses: {
    [HttpStatus.OK]: jsonContent(selectTransactions, 'The transactions list.'),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewTransactionsRoute = typeof viewTransactionsRoute;

export const viewTransactionRoute = createRoute({
  path: '/transactions/{id}',
  method: 'get',
  tags: [TAGS.TRANSACTIONS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectTransaction,
      "The transaction's data payload."
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The transaction was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewTransactionRoute = typeof viewTransactionRoute;
