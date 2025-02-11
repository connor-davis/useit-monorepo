import { eq, or } from 'drizzle-orm';

import { createId } from '@/lib/create-id';
import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { collectors } from '@/schemas/collectors';

import { CreateCollectorRoute } from './create.route';

export const createCollectorHandler: ThreeApiHandler<
  CreateCollectorRoute
> = async (context) => {
  const payload = context.req.valid('json');

  const existingCollector = await database.query.collectors.findFirst({
    where: or(
      eq(collectors.idNumber, payload.idNumber),
      eq(collectors.phoneNumber, payload.phoneNumber)
    ),
  });

  if (existingCollector)
    return context.json(
      {
        message:
          'There is already a collector with that ID number or phone number.',
      },
      HttpStatus.CONFLICT
    );

  const [collector] = await database
    .insert(collectors)
    .values({ ...payload, id: createId() })
    .returning();

  return context.json(collector, HttpStatus.CREATED);
};
