import configureOpenAPI from '@/lib/configure-openapi';
import configureScalar from '@/lib/configure-scalar';
import createApp from '@/lib/create-app';
import { businessesMiddleware } from '@/middleware/businesses';

import { collectorsMiddleware } from './middleware/collectors';
import businesses from './routes/businesses/businesses.router';
import index from './routes/index.router';
import profile from './routes/profile/profile.router';

const app = createApp();

const apiRoutes = [index, profile, businesses];
const apiBasePath = '/api';

configureOpenAPI(app);
configureScalar(app);

businessesMiddleware(app);
collectorsMiddleware(app);

apiRoutes.forEach((route) => app.route(apiBasePath, route));

export default app;
