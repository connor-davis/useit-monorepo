import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { JoystickIcon, UserIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@use-it/ui/components/avatar';
import { Button } from '@use-it/ui/components/button';
import { DebounceInput } from '@use-it/ui/components/debounce-input';
import { Label } from '@use-it/ui/components/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@use-it/ui/components/tooltip';

import DeleteUserDialog from '@/components/dialogs/users/delete';
import RoleGuard from '@/guards/role';
import useAdminUsers from '@/hooks/use-admin-users';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/_auth/users/')({
  component: () => (
    <RoleGuard roles={['admin']} isPage>
      <RouteComponent />
    </RoleGuard>
  ),
});

function RouteComponent() {
  const navigate = useNavigate();

  const { refetch } = authClient.useSession();

  const { users, searchValue, setSearchValue, fetchUsers } = useAdminUsers();

  return (
    <div className="flex flex-col w-full h-full overflow-hidden gap-3 p-3">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <Label className="font-bold text-lg">Users</Label>

        <div className="flex items-center">
          <DebounceInput
            type="text"
            placeholder="Search by name..."
            defaultValue={searchValue}
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-full overflow-y-auto gap-3">
        {users?.length === 0 && (
          <div className="flex flex-col w-full h-full items-center justify-center gap-3 p-3">
            <Label className="text-muted-foreground">No users found.</Label>
          </div>
        )}

        {users?.map((user) => (
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

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={async () => {
                      await authClient.admin.impersonateUser({
                        userId: user.id,
                      });

                      refetch();

                      return navigate({ to: '/', replace: true });
                    }}
                  >
                    <JoystickIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Control User</TooltipContent>
              </Tooltip>

              <DeleteUserDialog userId={user.id} onDeleted={fetchUsers} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
