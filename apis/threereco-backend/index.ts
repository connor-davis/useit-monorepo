import { serve } from '@hono/node-server';

import app from '@/app';
import { createAdmin } from '@/lib/create-admin';
import { runMigrations } from '@/lib/database';
import env from '@/lib/env';

const port = env.PORT;

try {
  await runMigrations();
} catch (error) {
  console.error(error);
  process.exit(1);
}

process.stdout.write('\x1Bc');

// Logs that must show need to go below this line

console.log(`
  /$$$$$$            /$$$$$$$$                    
 /$$__  $$          | $$_____/                    
|__/  \\ $$  /$$$$$$ | $$        /$$$$$$$  /$$$$$$ 
   /$$$$$/ /$$__  $$| $$$$$    /$$_____/ /$$__  $$
  |___  $$| $$  \\__/| $$__/   | $$      | $$  \\ $$
 /$$  \\ $$| $$      | $$      | $$      | $$  | $$
|  $$$$$$/| $$      | $$$$$$$$|  $$$$$$$|  $$$$$$/
 \\______/ |__/      |________/ \\_______/ \\______/ 
`);

console.log('🚀 The API is running on http://localhost:' + port);

await createAdmin();

serve({
  fetch: app.fetch,
  port,
});
