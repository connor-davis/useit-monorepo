import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import UiProviders from '@use-it/ui/components/providers';

import { queryClient } from '@/lib/query-client';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UiProviders>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UiProviders>
  );
}
