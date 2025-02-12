import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { products } from '@/schemas/products';

import { UpdateProductRoute } from './update.route';

export const updateProductHandler: ThreeApiHandler<UpdateProductRoute> = async (
  context
) => {
  const { id } = context.req.valid('param');
  const payload = context.req.valid('json');

  if (payload.materialId) {
    const existingProduct = await database.query.products.findFirst({
      where: eq(products.materialId, payload.materialId),
    });

    if (!existingProduct)
      return context.json(
        { message: 'There is already a product with that material.' },
        HttpStatus.CONFLICT
      );
  }

  const existingProduct = await database.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!existingProduct)
    return context.json(
      { message: 'The product was not found.' },
      HttpStatus.NOT_FOUND
    );

  const [product] = await database
    .update(products)
    .set({ ...payload })
    .where(eq(products.id, id))
    .returning();

  return context.json(product, HttpStatus.OK);
};
