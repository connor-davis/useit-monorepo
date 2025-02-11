import createRouter from '@/lib/create-router';

import { profileHandler } from './profile.handler';
import { profileRoute } from './profile.route';

const profile = createRouter().openapi(profileRoute, profileHandler);

export default profile;
