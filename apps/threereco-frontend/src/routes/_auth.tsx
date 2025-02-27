import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

import { Label } from '@use-it/ui/components/label';
import { SidebarProvider } from '@use-it/ui/components/sidebar';
import { TextShimmer } from '@use-it/ui/motion-ui/text-shimmer';

import AppSidebar from '@/components/app-sidebar';
import ProfileCard from '@/components/profile-card';
import SidebarTrigger from '@/components/sidebar-trigger';
import AuthenticationGuard from '@/guards/authentication';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/_auth')({
  component: () => (
    <AuthenticationGuard>
      <RouteComponent />
    </AuthenticationGuard>
  ),
});

function RouteComponent() {
  const { data: profile, isPending: isLoading } = authClient.useSession();

  if (isLoading)
    return (
      <div className="flex flex-col w-full h-full items-center justify-center p-3 gap-3">
        <TextShimmer>Loading user profile.</TextShimmer>
      </div>
    );

  if (profile?.user.role === 'user') return <Navigate to="/setup" />;

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex flex-col w-full h-full p-3 gap-3">
        <div className="grid grid-cols-2 gap-3 items-center w-full h-auto">
          <div className="flex flex-row items-center gap-3">
            <SidebarTrigger />
            <Label className="text-primary font-bold text-2xl">3rEco</Label>
          </div>

          <div className="flex flex-row items-center justify-end gap-3">
            <ProfileCard />
          </div>
        </div>

        <div className="flex flex-col size-full bg-background border rounded-md overflow-hidden">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
