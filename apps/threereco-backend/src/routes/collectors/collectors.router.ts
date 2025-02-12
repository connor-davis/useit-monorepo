import createRouter from '@/lib/create-router';

import { createCollectorHandler } from './create/create.handler';
import { createCollectorRoute } from './create/create.route';
import { deleteCollectorHandler } from './delete/delete.handler';
import { deleteCollectorRoute } from './delete/delete.route';
import { updateCollectorHandler } from './update/update.handler';
import { updateCollectorRoute } from './update/update.route';
import {
  viewCollectorHandler,
  viewCollectorsHandler,
} from './view/view.handler';
import { viewCollectorRoute, viewCollectorsRoute } from './view/view.route';

const collectors = createRouter()
  .openapi(viewCollectorsRoute, viewCollectorsHandler)
  .openapi(viewCollectorRoute, viewCollectorHandler)
  .openapi(createCollectorRoute, createCollectorHandler)
  .openapi(updateCollectorRoute, updateCollectorHandler)
  .openapi(deleteCollectorRoute, deleteCollectorHandler);

export default collectors;
