import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectMaterial, updateMaterial } from '@/models/materials';

export const updateMaterialRoute = createRoute({
  path: '/materials/{id}',
  method: 'patch',
  tags: [TAGS.MATERIALS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
    body: jsonContent(updateMaterial, "The updated material's data payload."),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectMaterial,
      "The updated material's data payload."
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The material was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['admin']),
});

export type UpdateMaterialRoute = typeof updateMaterialRoute;
