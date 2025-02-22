import { Navigate } from '@tanstack/react-router';
import { ReactNode } from 'react';

import { TextShimmer } from '@use-it/ui/motion-ui/text-shimmer';

import { authClient } from '@/lib/auth-client';

export default function AuthenticationGuard({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending)
    return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-3 p-3">
        <TextShimmer>Checking authentication.</TextShimmer>
      </div>
    );

  if (error || !session) return <Navigate to="/authentication/login" />;

  return children;
}
