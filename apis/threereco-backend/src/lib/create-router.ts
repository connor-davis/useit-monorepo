import { OpenAPIHono } from '@hono/zod-openapi';

import { ThreeApiConfig } from '@/lib/types';

import { auth } from './auth';

export default function createRouter() {
  const router = new OpenAPIHono<ThreeApiConfig>({ strict: false });

  router.use('*', async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set('user', null);
      c.set('session', null);
      return next();
    }

    c.set('user', session.user);
    c.set('session', session.session);
    return next();
  });

  router.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

  return router;
}
