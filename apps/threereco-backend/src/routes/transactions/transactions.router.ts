import createRouter from '@/lib/create-router';

import { acceptTransactionHandler } from './accept/accept.handler';
import { acceptTransactionRoute } from './accept/accept.route';
import { createTransactionHandler } from './create/create.handler';
import { createTransactionRoute } from './create/create.route';
import { declineTransactionHandler } from './decline/decline.handler';
import { declineTransactionRoute } from './decline/decline.route';
import {
  viewTransactionHandler,
  viewTransactionsHandler,
} from './view/view.handler';
import { viewTransactionRoute, viewTransactionsRoute } from './view/view.route';

const transactions = createRouter()
  .openapi(viewTransactionsRoute, viewTransactionsHandler)
  .openapi(viewTransactionRoute, viewTransactionHandler)
  .openapi(createTransactionRoute, createTransactionHandler)
  .openapi(acceptTransactionRoute, acceptTransactionHandler)
  .openapi(declineTransactionRoute, declineTransactionHandler);

export default transactions;
