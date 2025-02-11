import configureOpenAPI from '@/lib/configure-openapi';
import configureScalar from '@/lib/configure-scalar';
import createApp from '@/lib/create-app';

import businesses from './routes/businesses/businesses.router';
import collectors from './routes/collectors/collectors.router';
import index from './routes/index.router';
import profile from './routes/profile/profile.router';

const app = createApp();

const apiRoutes = [index, profile, businesses, collectors];
const apiBasePath = '/api';

configureOpenAPI(app);
configureScalar(app);

apiRoutes.forEach((route) => app.route(apiBasePath, route));

export default app;
