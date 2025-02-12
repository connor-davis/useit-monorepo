import { Outlet, createRootRoute } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import Providers from '@/components/providers';

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
      <TanStackRouterDevtools />
    </Providers>
  ),
});
