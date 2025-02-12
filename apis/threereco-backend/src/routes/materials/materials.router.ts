import createRouter from '@/lib/create-router';

import { createMaterialHandler } from './create/create.handler';
import { createMaterialRoute } from './create/create.route';
import { deleteMaterialHandler } from './delete/delete.handler';
import { deleteMaterialRoute } from './delete/delete.route';
import { updateMaterialHandler } from './update/update.handler';
import { updateMaterialRoute } from './update/update.route';
import { viewMaterialHandler, viewMaterialsHandler } from './view/view.handler';
import { viewMaterialRoute, viewMaterialsRoute } from './view/view.route';

const materials = createRouter()
  .openapi(viewMaterialsRoute, viewMaterialsHandler)
  .openapi(viewMaterialRoute, viewMaterialHandler)
  .openapi(createMaterialRoute, createMaterialHandler)
  .openapi(updateMaterialRoute, updateMaterialHandler)
  .openapi(deleteMaterialRoute, deleteMaterialHandler);

export default materials;
