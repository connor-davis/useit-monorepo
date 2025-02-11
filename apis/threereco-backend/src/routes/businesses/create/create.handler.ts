import { eq } from 'drizzle-orm';

import { createId } from '@/lib/create-id';
import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { businesses } from '@/schemas/businesses';

import { CreateBusinessRoute } from './create.route';

export const createBusinessHandler: ThreeApiHandler<
  CreateBusinessRoute
> = async (context) => {
  const payload = context.req.valid('json');

  const existingBusiness = await database.query.businesses.findFirst({
    where: eq(businesses.name, payload.name),
  });

  if (existingBusiness)
    return context.json(
      { message: 'There is already a business with that name.' },
      HttpStatus.CONFLICT
    );

  const [business] = await database
    .insert(businesses)
    .values({ ...payload, id: createId() })
    .returning();

  return context.json(business, HttpStatus.CREATED);
};
