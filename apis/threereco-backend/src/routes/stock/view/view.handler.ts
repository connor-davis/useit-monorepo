import { asc } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { stock } from '@/schemas/stock';

import { ViewStockRoute } from './view.route';

export const viewStockHandler: ThreeApiHandler<ViewStockRoute> = async (
  context
) => {
  const ascStock = await database.query.stock.findMany({
    orderBy: asc(stock.weight),
  });

  return context.json(ascStock, HttpStatus.OK);
};
