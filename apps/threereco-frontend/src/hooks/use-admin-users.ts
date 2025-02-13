import { getApiProfileOptions } from '@/api-client/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { UserWithRole } from 'better-auth/plugins/admin';

import { authClient } from '@/lib/auth-client';

export default function useAdminUsers() {
  const { data: profile } = useQuery({
    ...getApiProfileOptions(),
  });

  const [searchValue, setSearchValue] = useState<string | undefined>();

  const [users, setUsers] = useState<UserWithRole[]>([]);

  useEffect(() => {
    const disposeable = setTimeout(async () => {
      if (!profile) return;

      const { data } = await authClient.admin.listUsers({
        query: {
          sortBy: 'email',
          sortDirection: 'asc',
        },
      });

      if (data) setUsers(data.users);
      else setUsers([]);
    }, 0);

    return () => clearTimeout(disposeable);
  }, [profile, searchValue]);

  return { users, searchValue, setSearchValue };
}
