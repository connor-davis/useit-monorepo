import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { materials } from '@/schemas/materials';

import { UpdateMaterialRoute } from './update.route';

export const updateMaterialHandler: ThreeApiHandler<
  UpdateMaterialRoute
> = async (context) => {
  const { id } = context.req.valid('param');
  const payload = context.req.valid('json');

  const existingMaterial = await database.query.materials.findFirst({
    where: eq(materials.id, id),
  });

  if (!existingMaterial) {
    return context.json(
      { message: 'The material was not found.' },
      HttpStatus.NOT_FOUND
    );
  }

  const [material] = await database
    .update(materials)
    .set({ ...payload })
    .where(eq(materials.id, id))
    .returning();

  return context.json(material, HttpStatus.OK);
};
