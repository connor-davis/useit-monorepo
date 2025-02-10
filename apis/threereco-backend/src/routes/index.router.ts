import { createRoute, z } from '@hono/zod-openapi';

import createRouter from '@/lib/create-router';
import TAGS from '@/lib/tags';

const IndexText = `
  /$$$$$$            /$$$$$$$$                    
 /$$__  $$          | $$_____/                    
|__/  \\ $$  /$$$$$$ | $$        /$$$$$$$  /$$$$$$ 
   /$$$$$/ /$$__  $$| $$$$$    /$$_____/ /$$__  $$
  |___  $$| $$  \\__/| $$__/   | $$      | $$  \\ $$
 /$$  \\ $$| $$      | $$      | $$      | $$  | $$
|  $$$$$$/| $$      | $$$$$$$$|  $$$$$$$|  $$$$$$/
 \\______/ |__/      |________/ \\_______/ \\______/ 
`;

const index = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: [TAGS.INDEX.name],
    responses: {
      200: {
        content: {
          'text/plain': {
            schema: z.string().default('3rEco API index route.'),
          },
        },
        description: '3rEco API index route.',
      },
    },
  }),
  (context) => {
    return context.text(IndexText, 200);
  }
);

export default index;
