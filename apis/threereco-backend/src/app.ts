import configureOpenAPI from '@/lib/configure-openapi';
import configureScalar from '@/lib/configure-scalar';
import createApp from '@/lib/create-app';

import businesses from './routes/businesses/businesses.router';
import collectors from './routes/collectors/collectors.router';
import index from './routes/index.router';
import materials from './routes/materials/materials.router';
import products from './routes/products/products.router';
import profile from './routes/profile/profile.router';

const app = createApp();

const apiRoutes = [index, profile, businesses, collectors, materials, products];
const apiBasePath = '/api';

configureOpenAPI(app);
configureScalar(app);

apiRoutes.forEach((route) => app.route(apiBasePath, route));

export default app;
