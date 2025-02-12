import { createRoute, z } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { idSchema } from '@/lib/types';
import { authorized } from '@/middleware/authorized';
import { selectMaterial, selectMaterials } from '@/models/materials';

export const viewMaterialsRoute = createRoute({
  path: '/materials',
  method: 'get',
  tags: [TAGS.MATERIALS.name],
  responses: {
    [HttpStatus.OK]: jsonContent(selectMaterials, 'The materials list.'),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewMaterialsRoute = typeof viewMaterialsRoute;

export const viewMaterialRoute = createRoute({
  path: '/materials/{id}',
  method: 'get',
  tags: [TAGS.MATERIALS.name],
  request: {
    params: z.object({
      id: idSchema,
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      selectMaterial,
      "The material's data payload."
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The material was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ViewMaterialRoute = typeof viewMaterialRoute;
