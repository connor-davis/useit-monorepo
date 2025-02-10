import { eq } from 'drizzle-orm';

import database from '@/lib/database';
import { processLogger } from '@/middleware/pino-logger';
import { users } from '@/schemas/users';

import { auth } from './auth';
import env from './env';

export const createAdmin: () => Promise<void> = async () => {
  const existingAdmin = await database.query.users.findFirst({
    where: eq(users.email, env.ADMIN_EMAIL),
  });

  if (existingAdmin) return;

  const context = await auth.$context;
  const password = await context.password.hash(env.ADMIN_PASSWORD);

  const adminUser = await context.internalAdapter.createUser({
    name: '3rEco Administrator',
    email: env.ADMIN_EMAIL,
    role: 'admin',
  });

  await context.internalAdapter.createAccount({
    accountId: adminUser.id,
    providerId: 'email-password',
    userId: adminUser.id,
    password: password,
  });

  processLogger.info('👩‍💼 Created admin user');
};
