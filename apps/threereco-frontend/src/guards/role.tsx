import { getApiProfileOptions } from '@/api-client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from '@tanstack/react-router';

export default function RoleGuard({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) {
  const { data: profile, isLoading } = useQuery({
    ...getApiProfileOptions(),
  });

  if (isLoading) return undefined;
  if (!profile) return undefined;

  if (!roles.includes(profile.role)) return undefined;

  return children;
}
