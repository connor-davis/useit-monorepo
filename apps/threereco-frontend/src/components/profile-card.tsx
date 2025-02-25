import { useNavigate } from '@tanstack/react-router';
import { UserIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@use-it/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@use-it/ui/components/dropdown-menu';
import { Label } from '@use-it/ui/components/label';
import { Skeleton } from '@use-it/ui/components/skeleton';
import { useTheme } from '@use-it/ui/components/theme-provider';

import useIsImpersonating from '@/hooks/use-is-impersonating';
import { authClient } from '@/lib/auth-client';

export default function ProfileCard() {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const impersonating = useIsImpersonating();

  const {
    data: profile,
    isPending: isLoading,
    refetch,
  } = authClient.useSession();

  if (isLoading) return <Skeleton className="w-10 h-10 rounded-full" />;
  if (!profile) return <Skeleton className="w-10 h-10 rounded-full" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={profile.user.image ?? ''} alt={profile.user.name} />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={profile.user.image ?? ''}
                alt={profile.user.name}
              />
              <AvatarFallback className="bg-muted">
                <UserIcon className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Label>{profile.user.name}</Label>
              <Label className="text-muted-foreground">
                {profile.user.email}
              </Label>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {impersonating && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await authClient.admin.stopImpersonating();

                refetch();

                return navigate({ to: '/', replace: true });
              }}
            >
              Stop Controlling User
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => await authClient.signOut()}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
