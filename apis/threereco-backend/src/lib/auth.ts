import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI, twoFactor } from 'better-auth/plugins';

import { createId } from '@/lib/create-id';
import database from '@/lib/database';
import { origin } from '@/lib/origins';
import schemas from '@/schemas';

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: 'pg',
    schema: schemas,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  advanced: {
    generateId: () => createId(),
  },
  trustedOrigins: origin,
  plugins: [openAPI(), twoFactor(), admin()],
});
