import { QueryClient } from '@tanstack/react-query';

import { client } from '@/api-client/client.gen';

client.setConfig({
  credentials: 'include',
});

export const queryClient = new QueryClient();
