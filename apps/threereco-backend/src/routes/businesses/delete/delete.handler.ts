import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { businesses } from '@/schemas/businesses';

import { DeleteBusinessRoute } from './delete.route';

export const deleteBusinessHandler: ThreeApiHandler<
  DeleteBusinessRoute
> = async (context) => {
  const { id } = context.req.valid('param');

  const existingBusiness = await database.query.businesses.findFirst({
    where: eq(businesses.id, id),
  });

  if (!existingBusiness)
    return context.json(
      { message: 'The business was not found.' },
      HttpStatus.NOT_FOUND
    );

  await database.delete(businesses).where(eq(businesses.id, id));

  return context.text('ok', HttpStatus.OK);
};
