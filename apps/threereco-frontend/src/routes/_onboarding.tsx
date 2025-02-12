import { Outlet, createFileRoute } from '@tanstack/react-router';

import AuthenticationGuard from '@/guards/authentication';

export const Route = createFileRoute('/_onboarding')({
  component: () => (
    <AuthenticationGuard>
      <RouteComponent />
    </AuthenticationGuard>
  ),
});

function RouteComponent() {
  return <Outlet />;
}
