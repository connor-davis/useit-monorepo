import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { products } from '@/schemas/products';

import { DeleteProductRoute } from './delete.route';

export const deleteProductHandler: ThreeApiHandler<DeleteProductRoute> = async (
  context
) => {
  const { id } = context.req.valid('param');

  const existingProduct = await database.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!existingProduct)
    return context.json(
      { message: 'The product was not found.' },
      HttpStatus.NOT_FOUND
    );

  await database.delete(products).where(eq(products.id, id));

  return context.text('ok', HttpStatus.OK);
};
