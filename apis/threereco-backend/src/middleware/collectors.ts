import { OpenAPIHono } from '@hono/zod-openapi';
import { Context, Next } from 'hono';

import { ThreeApiConfig } from '@/lib/types';
import { requiredRoles } from '@/middleware/required-roles';

export const collectorsMiddleware = (app: OpenAPIHono<ThreeApiConfig>) => {
  app.on(
    ['POST', 'PATCH', 'DELETE'],
    '/api/businesses',
    async (context: Context<ThreeApiConfig>, next: Next) =>
      await requiredRoles(['admin', 'collector'], context, next)
  );
};
