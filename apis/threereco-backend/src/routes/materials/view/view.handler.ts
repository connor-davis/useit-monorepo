import { asc, eq } from 'drizzle-orm';

import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { materials } from '@/schemas/materials';

import { ViewMaterialRoute, ViewMaterialsRoute } from './view.route';

export const viewMaterialsHandler: ThreeApiHandler<ViewMaterialsRoute> = async (
  context
) => {
  const ascMaterials = await database.query.materials.findMany({
    orderBy: asc(materials.name),
  });

  return context.json(ascMaterials, HttpStatus.OK);
};

export const viewMaterialHandler: ThreeApiHandler<ViewMaterialRoute> = async (
  context
) => {
  const { id } = context.req.valid('param');

  const material = await database.query.materials.findFirst({
    where: eq(materials.id, id),
  });

  if (!material) {
    return context.json(
      { message: 'The material was not found.' },
      HttpStatus.NOT_FOUND
    );
  }

  return context.json(material, HttpStatus.OK);
};
