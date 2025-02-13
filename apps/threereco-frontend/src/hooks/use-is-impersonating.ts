import { authClient } from '@/lib/auth-client';

export default function useIsImpersonating() {
  const { data, isPending } = authClient.useSession();

  return (
    !isPending && data && data.session.impersonatedBy && !data.session.userAgent
  );
}
