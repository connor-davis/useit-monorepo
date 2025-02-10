import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { secureHeaders } from 'hono/secure-headers';

import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';

import createRouter from '@/lib/create-router';
import { threeLogger } from '@/middleware/pino-logger';

export default function createApp() {
  const app = createRouter();

  /**
   * Setup our valid origin endpoints. At some point this will be part of
   * a database.
   */
  const origin = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'https://one.thusa.co.za',
    'https://helix.thusa.co.za',
    'https://msr.thusa.co.za',
    'https://mer.thusa.co.za',
  ];

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
