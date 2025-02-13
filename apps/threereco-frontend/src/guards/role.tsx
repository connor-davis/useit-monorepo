import { ReactNode } from '@tanstack/react-router';

import { Label } from '@use-it/ui/components/label';

import { authClient } from '@/lib/auth-client';

export default function RoleGuard({
  roles,
  children,
  isPage = false,
}: {
  roles: string[];
  isPage?: boolean;
  children: ReactNode;
}) {
  const { data: profile, isPending: isLoading } = authClient.useSession();

  const hasAccess =
    profile && profile.user.role && roles.includes(profile.user.role);

  if (isLoading) return undefined;

  if (!hasAccess) {
    if (isPage)
      return (
        <div className="flex flex-col w-full h-full items-center justify-center p-3 gap-3">
          <Label className="text-2xl font-bold text-primary">Forbidden</Label>
          <Label className="text-muted-foreground">
            You do not have access to this page.
          </Label>
        </div>
      );
    return undefined;
  }

  return children;
}
