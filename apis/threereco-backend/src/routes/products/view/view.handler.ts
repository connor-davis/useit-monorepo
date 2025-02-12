import { asc, eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { products } from '@/schemas/products';

import { ViewProductRoute, ViewProductsRoute } from './view.route';

export const viewProductsHandler: ThreeApiHandler<ViewProductsRoute> = async (
  context
) => {
  const business = context.get('business');

  const ascProducts = await database.query.products.findMany({
    where: business ? eq(products.businessId, business.id) : undefined,
    orderBy: [asc(products.createdAt)],
  });

  return context.json(ascProducts, HttpStatus.OK);
};

export const viewProductHandler: ThreeApiHandler<ViewProductRoute> = async (
  context
) => {
  const { id } = context.req.valid('param');

  const product = await database.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!product)
    return context.json(
      { message: 'The product was not found.' },
      HttpStatus.NOT_FOUND
    );

  return context.json(product, HttpStatus.OK);
};
