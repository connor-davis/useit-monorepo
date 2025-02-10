import configureOpenAPI from '@/lib/configure-openapi';
import configureScalar from '@/lib/configure-scalar';
import createApp from '@/lib/create-app';

import { auth } from './lib/auth';
import index from './routes/index.router';

const app = createApp();

const apiRoutes = [index];
const apiBasePath = '/api';

configureOpenAPI(app);
configureScalar(app);

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

apiRoutes.forEach((route) => app.route(apiBasePath, route));

export default app;
