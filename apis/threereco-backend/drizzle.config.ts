import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/schemas',
  casing: 'snake_case',
  migrations: {
    prefix: 'timestamp',
    schema: './src/schemas',
    table: 'threereco_migrations',
  },
});
