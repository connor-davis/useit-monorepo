import { getApiProfileOptions } from '@/api-client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
import {
  Link,
  Navigate,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router';
import { BoxesIcon, UsersIcon } from 'lucide-react';

import { Button } from '@use-it/ui/components/button';
import { Label } from '@use-it/ui/components/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@use-it/ui/components/tooltip';
import { TextShimmer } from '@use-it/ui/motion-ui/text-shimmer';

import ProfileCard from '@/components/profile-card';
import AuthenticationGuard from '@/guards/authentication';
import RoleGuard from '@/guards/role';

export const Route = createFileRoute('/_auth')({
  component: () => (
    <AuthenticationGuard>
      <RouteComponent />
    </AuthenticationGuard>
  ),
});

function RouteComponent() {
  const { data: profile, isLoading } = useQuery({
    ...getApiProfileOptions(),
  });

  if (isLoading)
    return (
      <div className="flex flex-col w-full h-full items-center justify-center p-3 gap-3">
        <TextShimmer>Loading user profile.</TextShimmer>
      </div>
    );

  if (profile?.role === 'user') return <Navigate to="/setup" />;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-cols-2 gap-3 items-center w-full h-auto px-5 py-3">
        <div className="flex flex-row items-center gap-3">
          <Label className="text-primary font-bold text-2xl">3rEco</Label>
        </div>

        <div className="flex flex-row items-center justify-end gap-3">
          <ProfileCard />
        </div>
      </div>

      <div className="flex w-full h-full overflow-hidden px-5 pb-3 gap-3">
        <div className="flex flex-col w-auto h-full p-3 gap-3 bg-background rounded-md border">
          <RoleGuard roles={['admin']}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-primary"
                  size="icon"
                  asChild
                >
                  <Link to="/users">
                    <UsersIcon className="size-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-primary"
                  size="icon"
                  asChild
                >
                  <Link to="/">
                    <BoxesIcon className="size-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Materials</TooltipContent>
            </Tooltip>
          </RoleGuard>
        </div>

        <div className="flex flex-col size-full bg-background border rounded-md p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
