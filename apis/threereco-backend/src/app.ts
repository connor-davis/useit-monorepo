import configureOpenAPI from '@/lib/configure-openapi';
import configureScalar from '@/lib/configure-scalar';
import createApp from '@/lib/create-app';

import index from './routes/index.router';

const app = createApp();

const apiRoutes = [index];
const apiBasePath = '/api';

configureOpenAPI(app);
configureScalar(app);

apiRoutes.forEach((route) => app.route(apiBasePath, route));

export default app;
