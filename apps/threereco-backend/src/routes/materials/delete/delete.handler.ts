import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { materials } from '@/schemas/materials';

import { DeleteMaterialRoute } from './delete.route';

export const deleteMaterialHandler: ThreeApiHandler<
  DeleteMaterialRoute
> = async (context) => {
  const { id } = context.req.valid('param');

  const existingMaterial = await database.query.materials.findFirst({
    where: eq(materials.id, id),
  });

  if (!existingMaterial) {
    return context.json(
      { message: 'The material was not found.' },
      HttpStatus.NOT_FOUND
    );
  }

  await database.delete(materials).where(eq(materials.id, id));

  return context.text('ok', HttpStatus.OK);
};
