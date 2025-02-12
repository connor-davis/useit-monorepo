import { createId } from '@/lib/create-id';
import database from '@/lib/database';
import HttpStatus from '@/lib/http-status';
import { ThreeApiHandler } from '@/lib/types';
import { materials } from '@/schemas/materials';

import { CreateMaterialRoute } from './create.route';

export const createMaterialHandler: ThreeApiHandler<
  CreateMaterialRoute
> = async (context) => {
  const payload = context.req.valid('json');

  const [material] = await database
    .insert(materials)
    .values({ ...payload, id: createId() })
    .returning();

  return context.json(material, HttpStatus.CREATED);
};
