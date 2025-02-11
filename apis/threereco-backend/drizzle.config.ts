import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: ['./src/schemas', './src/schemas/enums'],
  casing: 'snake_case',
  migrations: {
    prefix: 'timestamp',
    schema: './src/schemas/index.ts',
    table: 'threereco_migrations',
  },
});
