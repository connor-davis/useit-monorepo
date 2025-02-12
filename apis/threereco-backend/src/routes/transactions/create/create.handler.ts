import { createId } from '@/lib/create-id';
import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { transactions } from '@/schemas/transactions';

import { CreateTransactionRoute } from './create.route';

export const createTransactionHandler: ThreeApiHandler<
  CreateTransactionRoute
> = async (context) => {
  const payload = context.req.valid('json');

  const [transaction] = await database
    .insert(transactions)
    .values({
      ...payload,
      id: createId(),
      sellerAccepted: payload.type === 'collection',
    })
    .returning();

  return context.json(transaction, HttpStatus.CREATED);
};
