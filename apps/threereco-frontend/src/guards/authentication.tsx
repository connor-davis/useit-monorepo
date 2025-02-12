import { ReactNode } from 'react';
import { TextShimmer } from '@use-it/ui/motion-ui/text-shimmer';
import { authClient } from '@/lib/auth-client';

export default function AuthenticationGuard({
  children,
}: {
  children: ReactNode;
}) {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  if (isPending)
    return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-3 p-3">
        <TextShimmer>Checking authentication.</TextShimmer>
      </div>
    );

  if (error || !session) return undefined;

  return children;
}
