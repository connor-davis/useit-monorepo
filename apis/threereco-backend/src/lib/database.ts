import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import env from '@/lib/env';
import schemas from '@/schemas';

const migrationClient = postgres(env.DATABASE_URL ?? '', { max: 1 });

export const runMigrations = () =>
  migrate(drizzle(migrationClient), {
    migrationsFolder: './drizzle',
    migrationsSchema: 'public',
    migrationsTable: 'threereco_migrations',
  });

const queryClient = postgres(env.DATABASE_URL ?? '');
const database = drizzle(queryClient, {
  schema: schemas,
  casing: 'snake_case',
});

export default database;
