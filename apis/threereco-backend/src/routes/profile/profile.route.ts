import { createRoute } from '@hono/zod-openapi';

import jsonContent from 'stoker/openapi/helpers/json-content';
import createMessageObjectSchema from 'stoker/openapi/schemas/create-message-object';

import HttpStatus from '@/lib/http-status';
import TAGS from '@/lib/tags';
import { authorized } from '@/middleware/authorized';
import { selectUser } from '@/models/users';

export const profileRoute = createRoute({
  path: '/profile',
  method: 'get',
  tags: [TAGS.PROFILE.name],
  responses: {
    [HttpStatus.OK]: jsonContent(selectUser, 'The users profile.'),
    [HttpStatus.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('The user profile was not found.'),
      'The not-found error message.'
    ),
  },
  middleware: async (context, next) => await authorized(context, next),
});

export type ProfileRoute = typeof profileRoute;
