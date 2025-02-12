import { eq } from 'drizzle-orm';

import { createId } from '@/lib/create-id';
import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { products } from '@/schemas/products';

import { CreateProductRoute } from './create.route';

export const createProductHandler: ThreeApiHandler<CreateProductRoute> = async (
  context
) => {
  const payload = context.req.valid('json');

  const existingProduct = await database.query.products.findFirst({
    where: eq(products.materialId, payload.materialId),
  });

  if (existingProduct)
    return context.json(
      { message: 'There is already a product with that material.' },
      HttpStatus.CONFLICT
    );

  const [product] = await database
    .insert(products)
    .values({ ...payload, id: createId() })
    .returning();

  return context.json(product, HttpStatus.CREATED);
};
