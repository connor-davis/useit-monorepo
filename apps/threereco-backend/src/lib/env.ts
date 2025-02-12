import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { ZodError, z } from 'zod';

expand(config());

const Environment = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),

  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string(),

  DATABASE_URL: z.string().url(),

  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string().url(),
});

export type Environment = z.infer<typeof Environment>;

let env: Environment;

try {
  env = Environment.parse(process.env);
} catch (err) {
  const error = err as ZodError;

  console.error('🔥 Invalid Environment.');
  console.error(error.flatten().fieldErrors);

  process.exit(1);
}

export default env;
