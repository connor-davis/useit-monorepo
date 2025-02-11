import { OpenAPIHono } from '@hono/zod-openapi';

import { ThreeApiConfig } from '@/lib/types';

export default function createRouter() {
  return new OpenAPIHono<ThreeApiConfig>({ strict: false });
}
