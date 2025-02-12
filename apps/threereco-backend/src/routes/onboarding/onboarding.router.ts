import createRouter from '@/lib/create-router';

import { setRoleHandler } from './set-role/set-role.handler';
import { setRoleRoute } from './set-role/set-role.route';

const onboarding = createRouter().openapi(setRoleRoute, setRoleHandler);

export default onboarding;
