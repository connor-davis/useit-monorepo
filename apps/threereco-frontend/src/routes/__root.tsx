import { Outlet, createRootRoute } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import UiProviders from '@use-it/ui/components/providers';

export const Route = createRootRoute({
  component: () => (
    <UiProviders>
      <Outlet />
      <TanStackRouterDevtools />
    </UiProviders>
  ),
});
