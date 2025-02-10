import { OpenAPIHono } from '@hono/zod-openapi';

import TAGS from '@/lib/tags';
import { ThreeApiConfig } from '@/lib/types';

import packageJSON from '../../package.json';

export default function configureOpenAPI(app: OpenAPIHono<ThreeApiConfig>) {
  app.doc('/api/api-spec', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Thusa One API',
      description: 'The Thusa One API documentation.',
    },
    servers: [
      {
        url: 'http://localhost:6173',
        description: 'The development environment api.',
      },
      {
        url: 'https://one.thusa.co.za',
        description: 'The production environment api.',
      },
    ],
    tags: Object.values(TAGS),
  });
}
