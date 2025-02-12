import createRouter from '@/lib/create-router';

import { createProductHandler } from './create/create.handler';
import { createProductRoute } from './create/create.route';
import { deleteProductHandler } from './delete/delete.handler';
import { deleteProductRoute } from './delete/delete.route';
import { updateProductHandler } from './update/update.handler';
import { updateProductRoute } from './update/update.route';
import { viewProductHandler, viewProductsHandler } from './view/view.handler';
import { viewProductRoute, viewProductsRoute } from './view/view.route';

const products = createRouter()
  .openapi(viewProductsRoute, viewProductsHandler)
  .openapi(viewProductRoute, viewProductHandler)
  .openapi(createProductRoute, createProductHandler)
  .openapi(updateProductRoute, updateProductHandler)
  .openapi(deleteProductRoute, deleteProductHandler);

export default products;
