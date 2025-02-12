import { OpenAPIHono } from '@hono/zod-openapi';

import TAGS from '@/lib/tags';
import { ThreeApiConfig } from '@/lib/types';

import packageJSON from '../../package.json';

export default function configureOpenAPI(app: OpenAPIHono<ThreeApiConfig>) {
  app.doc('/api/api-spec', {
    openapi: '3.1.1',
    info: {
      version: packageJSON.version,
      title: '3rEco API',
      description: 'The 3rEco API documentation.',
    },
    servers: [
      {
        url: 'http://localhost:6173',
        description: 'The development environment api.',
      },
      {
        url: 'https://3reco.lone-wolf.dev',
        description: 'The production environment api.',
      },
    ],
    tags: Object.values(TAGS).sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;

      return 0;
    }),
  });
}
