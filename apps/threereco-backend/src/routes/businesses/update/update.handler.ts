import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { businesses } from '@/schemas/businesses';

import { UpdateBusinessRoute } from './update.route';

export const updateBusinessHandler: ThreeApiHandler<
  UpdateBusinessRoute
> = async (context) => {
  const { id } = context.req.valid('param');
  const payload = context.req.valid('json');

  const existingBusiness = await database.query.businesses.findFirst({
    where: eq(businesses.id, id),
  });

  if (!existingBusiness)
    return context.json(
      { message: 'The business was not found.' },
      HttpStatus.NOT_FOUND
    );

  const [business] = await database
    .update(businesses)
    .set({ ...payload })
    .where(eq(businesses.id, id))
    .returning();

  return context.json(business, HttpStatus.OK);
};
