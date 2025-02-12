import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';

import { ThreeApiConfig } from '@/lib/types';

export default function configureScalar(app: OpenAPIHono<ThreeApiConfig>) {
  app.get(
    '/api/api-doc',
    apiReference({
      spec: {
        url: '/api/api-spec',
      },
      theme: 'default',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'fetch',
      },
    })
  );
}
