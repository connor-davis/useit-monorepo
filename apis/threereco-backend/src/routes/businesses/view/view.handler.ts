import { asc, eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { businesses } from '@/schemas/businesses';

import { ViewBusinessRoute, ViewBusinessesRoute } from './view.route';

export const viewBusinessesHandler: ThreeApiHandler<
  ViewBusinessesRoute
> = async (context) => {
  const ascBusinesses = await database.query.businesses.findMany({
    orderBy: [asc(businesses.name)],
  });

  return context.json(ascBusinesses, HttpStatus.OK);
};

export const viewBusinessHandler: ThreeApiHandler<ViewBusinessRoute> = async (
  context
) => {
  const { id } = context.req.valid('param');

  const business = await database.query.businesses.findFirst({
    where: eq(businesses.id, id),
  });

  if (!business)
    return context.json(
      { message: 'The business was not found.' },
      HttpStatus.NOT_FOUND
    );

  return context.json(business, HttpStatus.OK);
};
