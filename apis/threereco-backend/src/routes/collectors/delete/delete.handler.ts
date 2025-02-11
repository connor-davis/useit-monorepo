import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { collectors } from '@/schemas/collectors';

import { DeleteCollectorRoute } from './delete.route';

export const deleteCollectorHandler: ThreeApiHandler<
  DeleteCollectorRoute
> = async (context) => {
  const { id } = context.req.valid('param');

  const existingCollector = await database.query.collectors.findFirst({
    where: eq(collectors.id, id),
  });

  if (!existingCollector)
    return context.json(
      { message: 'The collector was not found.' },
      HttpStatus.NOT_FOUND
    );

  await database.delete(collectors).where(eq(collectors.id, id));

  return context.text('ok', HttpStatus.OK);
};
