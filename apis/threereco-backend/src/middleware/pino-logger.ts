import { pinoLogger } from 'hono-pino';

import pino from 'pino';
import pretty from 'pino-pretty';

import env from '@/lib/env';

export function threeLogger() {
  return pinoLogger({
    pino: pino(
      { level: env.LOG_LEVEL },
      env.NODE_ENV === 'production' ? undefined : pretty()
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
