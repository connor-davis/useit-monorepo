import { createFileRoute } from '@tanstack/react-router';
import { UserIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@use-it/ui/components/avatar';
import { Button } from '@use-it/ui/components/button';
import { Label } from '@use-it/ui/components/label';

import RoleGuard from '@/guards/role';
import useAdminUsers from '@/hooks/use-admin-users';

export const Route = createFileRoute('/_auth/users/')({
  component: () => (
    <RoleGuard roles={['admin']}>
      <RouteComponent />
    </RoleGuard>
  ),
});

function RouteComponent() {
  const { users } = useAdminUsers();

  return (
    <div className="flex flex-col w-full h-full overflow-hidden gap-3">
      <div className="flex flex-col lg:flex-row gap-3 items-center lg:justify-between">
        <Label className="font-bold text-lg">Users</Label>
      </div>

      <div className="flex flex-col w-full h-full overflow-y-auto gap-3">
        {users.map((user) => (
          <div className="flex items-center gap-1 p-1 border rounded-md">
            <Button
              variant="ghost"
              className="p-2 h-auto w-full justify-start"
              asChild
            >
              <div className="flex items-center gap-1">
                <Avatar>
                  <AvatarImage src={user.image ?? ''} alt={user.email} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <Label>{user.name}</Label>
                  <Label className="text-muted-foreground">{user.email}</Label>
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
