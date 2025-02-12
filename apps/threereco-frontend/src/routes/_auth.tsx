import { Outlet, createFileRoute } from '@tanstack/react-router';

import AuthenticationGuard from '@/guards/authentication';

export const Route = createFileRoute('/_auth')({
  component: () => (
    <AuthenticationGuard>
      <RouteComponent />
    </AuthenticationGuard>
  ),
});

function RouteComponent() {
  return (
    <div className="flex flex-col w-full h-full">
      <div>Hello World</div>
      <Outlet />
    </div>
  );
}
