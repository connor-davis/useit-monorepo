import { serve } from 'bun';

import app from '@/app';
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

serve({
  fetch: app.fetch,
  port,
});
