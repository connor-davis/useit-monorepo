import { getApiProfileOptions } from '@/api-client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
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
  DropdownMenuTrigger,
} from '@use-it/ui/components/dropdown-menu';
import { Label } from '@use-it/ui/components/label';
import { Skeleton } from '@use-it/ui/components/skeleton';

import { authClient } from '@/lib/auth-client';

export default function ProfileCard() {
  const { data: profile, isLoading } = useQuery({
    ...getApiProfileOptions(),
  });

  if (isLoading) return <Skeleton className="w-10 h-10 rounded-full" />;
  if (!profile) return <Skeleton className="w-10 h-10 rounded-full" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={profile.image} alt={profile.name} />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback className="bg-muted">
                <UserIcon className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Label>{profile.name}</Label>
              <Label className="text-muted-foreground">{profile.email}</Label>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
