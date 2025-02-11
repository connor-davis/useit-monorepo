import { OpenAPIHono } from '@hono/zod-openapi';
import { Context, Next } from 'hono';

import { ThreeApiConfig } from '@/lib/types';
import { requiredRoles } from '@/middleware/required-roles';

export const businessesMiddleware = (app: OpenAPIHono<ThreeApiConfig>) => {
  app.on(
    ['POST', 'PATCH'],
    '/api/businesses',
    async (context: Context<ThreeApiConfig>, next: Next) =>
      await requiredRoles(['business'], context, next)
  );

  app.on(
    'DELETE',
    '/api/businesses',
    async (context: Context<ThreeApiConfig>, next: Next) =>
      await requiredRoles(['admin', 'business'], context, next)
  );
};
