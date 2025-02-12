import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI, twoFactor } from 'better-auth/plugins';

import { createId } from '@/lib/create-id';
import database from '@/lib/database';
import { origin } from '@/lib/origins';
import schemas from '@/schemas';

import env from './env';

export const auth = betterAuth({
  appName: '3rEco',
  baseURL:
    env.NODE_ENV === 'production'
      ? 'https://3reco.lone-wolf.dev'
      : 'http://localhost:6173',
  database: drizzleAdapter(database, {
    provider: 'pg',
    schema: schemas,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
  },
  advanced: {
    generateId: () => createId(),
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      domain:
        env.NODE_ENV === 'production' ? '3reco.lone-wolf.dev' : 'localhost',
      sameSite: 'strict',
    },
  },
  trustedOrigins: origin,
  plugins: [openAPI(), twoFactor(), admin()],
});
