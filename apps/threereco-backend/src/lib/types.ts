import { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import { PinoLogger } from 'hono-pino';

import { customType } from 'drizzle-orm/pg-core';
import { z } from 'zod';

import { selectBusiness } from '@/models/businesses';
import { selectCollector } from '@/models/collectors';

import { auth } from './auth';

export type ThreeApiConfig = {
  Variables: {
    logger: PinoLogger;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    business: typeof selectBusiness._type | null;
    collector: typeof selectCollector._type | null;
  };
};

export type ThreeApiHandler<R extends RouteConfig> = RouteHandler<
  R,
  ThreeApiConfig
>;

export const decimalNumber = customType<{ data: number }>({
  dataType() {
    return 'decimal';
  },
  fromDriver(value) {
    return Number(value);
  },
});

export const bigintNumber = customType<{ data: number }>({
  dataType() {
    return 'bigint';
  },
  fromDriver(value) {
    return Number(value);
  },
});

export const idSchema = z
  .string()
  .min(32, 'Please enter a valid id.')
  .max(32, 'Please enter a valid id.');
