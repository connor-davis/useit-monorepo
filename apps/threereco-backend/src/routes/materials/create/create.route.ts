import { createRoute } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';
import { insertMaterial, selectMaterial } from '@/models/materials';

export const createMaterialRoute = createRoute({
  path: '/materials',
  method: 'post',
  tags: [TAGS.MATERIALS.name],
  request: {
    body: jsonContent(insertMaterial, "The new material's data payload."),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(
      selectMaterial,
      "The new material's data payload."
    ),
  },
  middleware: async (context, next) =>
    await authorized(context, next, ['admin']),
});

export type CreateMaterialRoute = typeof createMaterialRoute;
