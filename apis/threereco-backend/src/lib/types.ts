import { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import { PinoLogger } from 'hono-pino';

import { customType } from 'drizzle-orm/pg-core';

export type ThreeApiConfig = {
  Variables: {
    logger: PinoLogger;
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
