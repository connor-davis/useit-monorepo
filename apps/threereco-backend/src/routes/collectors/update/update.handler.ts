import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { collectors } from '@/schemas/collectors';

import { UpdateCollectorRoute } from './update.route';

export const updateCollectorHandler: ThreeApiHandler<
  UpdateCollectorRoute
> = async (context) => {
  const { id } = context.req.valid('param');
  const payload = context.req.valid('json');

  const existingCollector = await database.query.collectors.findFirst({
    where: eq(collectors.id, id),
  });

  if (!existingCollector)
    return context.json(
      { message: 'The collector was not found.' },
      HttpStatus.NOT_FOUND
    );

  const [collector] = await database
    .update(collectors)
    .set({ ...payload })
    .where(eq(collectors.id, id))
    .returning();

  return context.json(collector, HttpStatus.OK);
};
