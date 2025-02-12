import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { stock } from '@/schemas/stock';

import { ViewProductStockRoute } from './product.route';

export const viewProductStockHandler: ThreeApiHandler<
  ViewProductStockRoute
> = async (context) => {
  const { id } = context.req.valid('param');

  const existingStock = await database.query.stock.findFirst({
    where: eq(stock.productId, id),
  });

  if (!existingStock) {
    return context.json(
      { message: 'The stock was not found.' },
      HttpStatus.NOT_FOUND
    );
  }

  return context.json(existingStock, HttpStatus.OK);
};
