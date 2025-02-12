import { asc, eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { stock } from '@/schemas/stock';

import { ViewStockRoute } from './view.route';

export const viewStockHandler: ThreeApiHandler<ViewStockRoute> = async (
  context
) => {
  const business = context.get('business');

  const ascStock = await database.query.stock.findMany({
    where: business ? eq(stock.businessId, business.id) : undefined,
    orderBy: asc(stock.weight),
  });

  return context.json(ascStock, HttpStatus.OK);
};
