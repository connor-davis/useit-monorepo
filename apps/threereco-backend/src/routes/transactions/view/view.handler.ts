import { asc, eq, or } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { transactions } from '@/schemas/transactions';

import { ViewTransactionRoute, ViewTransactionsRoute } from './view.route';

export const viewTransactionsHandler: ThreeApiHandler<
  ViewTransactionsRoute
> = async (context) => {
  const business = context.get('business');

  const ascTransactions = await database.query.transactions.findMany({
    where: business
      ? or(
          eq(transactions.buyerId, business.userId),
          eq(transactions.sellerId, business.userId)
        )
      : undefined,
    orderBy: [asc(transactions.createdAt)],
  });

  return context.json(ascTransactions, HttpStatus.OK);
};

export const viewTransactionHandler: ThreeApiHandler<
  ViewTransactionRoute
> = async (context) => {
  const { id } = context.req.valid('param');

  const transaction = await database.query.transactions.findFirst({
    where: eq(transactions.id, id),
  });

  if (!transaction)
    return context.json(
      { message: 'The transaction was not found.' },
      HttpStatus.NOT_FOUND
    );

  return context.json(transaction, HttpStatus.OK);
};
