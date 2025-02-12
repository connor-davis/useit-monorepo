import createRouter from '@/lib/create-router';

import { viewProductStockHandler } from './product/product.handler';
import { viewProductStockRoute } from './product/product.route';
import { viewStockHandler } from './view/view.handler';
import { viewStockRoute } from './view/view.route';

const stock = createRouter()
  .openapi(viewStockRoute, viewStockHandler)
  .openapi(viewProductStockRoute, viewProductStockHandler);

export default stock;
