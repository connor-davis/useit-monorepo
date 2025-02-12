import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { transactions } from '@/schemas/transactions';

import { DeclineTransactionRoute } from './decline.route';

export const declineTransactionHandler: ThreeApiHandler<
  DeclineTransactionRoute
> = async (context) => {
  const { id } = context.req.valid('param');

  const existingTransaction = await database.query.transactions.findFirst({
    where: eq(transactions.id, id),
  });

  if (!existingTransaction)
    return context.json(
      { message: 'The transaction was not found.' },
      HttpStatus.NOT_FOUND
    );

  await database
    .update(transactions)
    .set({ sellerDeclined: true })
    .where(eq(transactions.id, id));

  return context.text('ok', HttpStatus.OK);
};
