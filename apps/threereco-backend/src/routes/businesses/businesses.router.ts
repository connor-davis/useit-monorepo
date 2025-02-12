import createRouter from '@/lib/create-router';

import { createBusinessHandler } from './create/create.handler';
import { createBusinessRoute } from './create/create.route';
import { deleteBusinessHandler } from './delete/delete.handler';
import { deleteBusinessRoute } from './delete/delete.route';
import { updateBusinessHandler } from './update/update.handler';
import { updateBusinessRoute } from './update/update.route';
import {
  viewBusinessHandler,
  viewBusinessesHandler,
} from './view/view.handler';
import { viewBusinessRoute, viewBusinessesRoute } from './view/view.route';

const businesses = createRouter()
  .openapi(viewBusinessesRoute, viewBusinessesHandler)
  .openapi(viewBusinessRoute, viewBusinessHandler)
  .openapi(createBusinessRoute, createBusinessHandler)
  .openapi(updateBusinessRoute, updateBusinessHandler)
  .openapi(deleteBusinessRoute, deleteBusinessHandler);

export default businesses;
