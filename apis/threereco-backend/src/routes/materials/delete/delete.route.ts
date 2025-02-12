import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';

export const deleteMaterialRoute = createRoute({
  path: '/materials/{id}',
  method: 'delete',
  tags: [TAGS.MATERIALS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: {
      content: {
        'text/plain': {
          schema: z.string().default('ok'),
        },
      },
      description: 'The material was deleted.',
    },
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The material was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['admin']),
});

export type DeleteMaterialRoute = typeof deleteMaterialRoute;
