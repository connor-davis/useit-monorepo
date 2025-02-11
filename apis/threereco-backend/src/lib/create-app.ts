import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';

import createRouter from '@/lib/create-router';
import { origin } from '@/lib/origins';
import { threeLogger } from '@/middleware/pino-logger';

export default function createApp() {
  const app = createRouter();

  /**
   * Setup our not found and error middleware to return JSON responses.
   */
  app.notFound(notFound);
  app.onError(onError);

  /**
   * Setup our usages.
   */
  app.use(serveEmojiFavicon('📦'));
  app.use(threeLogger());

  app.use(secureHeaders());
  app.use(
    cors({
      origin,
      credentials: true,
    })
  );
  app.use(
    csrf({
      origin,
    })
  );

  return app;
}
