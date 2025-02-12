import createRouter from '@/lib/create-router';

import { viewStockHandler } from './view/view.handler';
import { viewStockRoute } from './view/view.route';

const stock = createRouter().openapi(viewStockRoute, viewStockHandler);

export default stock;
