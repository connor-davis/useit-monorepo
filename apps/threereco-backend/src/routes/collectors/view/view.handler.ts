import { asc, eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { collectors } from '@/schemas/collectors';

import { ViewCollectorRoute, ViewCollectorsRoute } from './view.route';

export const viewCollectorsHandler: ThreeApiHandler<
  ViewCollectorsRoute
> = async (context) => {
  const ascCollectors = await database.query.collectors.findMany({
    orderBy: [asc(collectors.name)],
  });

  return context.json(ascCollectors, HttpStatus.OK);
};

export const viewCollectorHandler: ThreeApiHandler<ViewCollectorRoute> = async (
  context
) => {
  const { id } = context.req.valid('param');

  const collector = await database.query.collectors.findFirst({
    where: eq(collectors.id, id),
  });

  if (!collector)
    return context.json(
      { message: 'The collector was not found.' },
      HttpStatus.NOT_FOUND
    );

  return context.json(collector, HttpStatus.OK);
};
